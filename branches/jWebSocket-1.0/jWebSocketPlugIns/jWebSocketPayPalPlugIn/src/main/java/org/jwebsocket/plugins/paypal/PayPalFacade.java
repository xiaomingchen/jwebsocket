//	---------------------------------------------------------------------------
//	jWebSocket - jWebSocket JDBC Plug-In (Community Edition, CE)
//	---------------------------------------------------------------------------
//	Copyright 2010-2014 Innotrade GmbH (jWebSocket.org)
//      Alexander Schulze, Germany (NRW)
//
//	Licensed under the Apache License, Version 2.0 (the "License");
//	you may not use this file except in compliance with the License.
//	You may obtain a copy of the License at
//
//	http://www.apache.org/licenses/LICENSE-2.0
//
//	Unless required by applicable law or agreed to in writing, software
//	distributed under the License is distributed on an "AS IS" BASIS,
//	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//	See the License for the specific language governing permissions and
//	limitations under the License.
//	---------------------------------------------------------------------------
package org.jwebsocket.plugins.paypal;

import com.paypal.api.payments.Amount;
import com.paypal.api.payments.Item;
import com.paypal.api.payments.ItemList;
import com.paypal.api.payments.Payer;
import com.paypal.api.payments.PayerInfo;
import com.paypal.api.payments.Payment;
import com.paypal.api.payments.PaymentExecution;
import com.paypal.api.payments.PaymentHistory;
import com.paypal.api.payments.RedirectUrls;
import com.paypal.api.payments.Refund;
import com.paypal.api.payments.Sale;
import com.paypal.api.payments.Transaction;
import com.paypal.core.rest.APIContext;
import com.paypal.core.rest.OAuthTokenCredential;
import com.paypal.core.rest.PayPalRESTException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.token.Token;
import org.springframework.core.annotation.Order;

/**
 *
 * @author Omar Antonio Díaz Peña
 */
public class PayPalFacade {

    private String clientID;
    private String clientSecret;

    public PayPalFacade(String aClientID, String aClientSecret) {
        this.clientID = aClientID;
        this.clientSecret = aClientSecret;
    }

    public String getAccessToken() throws Exception {

        String accessToken = null;
        try {
            accessToken = new OAuthTokenCredential(this.clientID, this.clientSecret).getAccessToken();
        } catch (PayPalRESTException ex) {
            Logger.getLogger(PayPalFacade.class.getName()).log(Level.SEVERE, null, ex);
        }
        return accessToken;
    }

    public Payment createPayment(Token aToken) throws Exception {
        Payment lPayment = new Payment();
        lPayment.setIntent(aToken.getString("intent"));

        Payer lPayer = new Payer();
        Map lPayerData = (Map) aToken.getMap("payer").get("payer_info");

        PayerInfo lPayerInfo = new PayerInfo();
        lPayer.setPayerInfo(lPayerInfo);
        lPayer.setPaymentMethod("paypal");
        lPayerInfo.setFirstName((String) lPayerData.get("first_name"));
        lPayerInfo.setLastName((String) lPayerData.get("last_name"));
        lPayerInfo.setPayerId((String) lPayerData.get("payer_id"));
        lPayer.setPayerInfo(lPayerInfo);
        Map lRedirectData = (Map) aToken.getMap("redirect_urls");

        RedirectUrls lRedirectUrls = new RedirectUrls();
        lRedirectUrls.setReturnUrl((String) lRedirectData.get("return_url"));
        lRedirectUrls.setCancelUrl((String) lRedirectData.get("cancel_url"));
        lPayment.setRedirectUrls(lRedirectUrls);

        lPayment.setPayer(lPayer);
        List lTransactionsData = aToken.getList("transactions");

        LinkedList<Transaction> lTransactions = new LinkedList<Transaction>();

        for (Object object : lTransactionsData) {
            Map lTransactionData = (Map) object;
            Map lTmpListData = (Map) lTransactionData.get("item_list");
            List lItemListData = (List) lTmpListData.get("items");
            Map lAmountData = (Map) lTransactionData.get("amount");
            Transaction lTransaction = new Transaction();

            ItemList lItemList = new ItemList();
            List<Item> lTmpItemList = new ArrayList<Item>();

            for (Object lItemData : lItemListData) {
                Map lTmpItemData = (Map) lItemData;
                Item lItem = new Item();
                lItem.setCurrency((String) lTmpItemData.get("currency"));
                lItem.setPrice((String) lTmpItemData.get("price"));
                lItem.setName((String) lTmpItemData.get("name"));
                lItem.setQuantity(lTmpItemData.get("quantity").toString());
                lItem.setSku((String) lTmpItemData.get("sku"));

                lTmpItemList.add(lItem);
            }

            lItemList.setItems(lTmpItemList);
            lTransaction.setItemList(lItemList);

            Amount lAmount = new Amount();
            lAmount.setCurrency((String) lAmountData.get("currency"));
            lAmount.setTotal((String) lAmountData.get("total"));
            lTransaction.setAmount(lAmount);
            lTransaction.setDescription(
                    (String) lTransactionData.get("description")
            );
            lTransactions.add(lTransaction);
        }

        lPayment.setTransactions(lTransactions);
        
        return lPayment.create(this.getAccessToken());
    }

    public Payment executePayment(Token aToken) throws Exception {
        Payment lPayment = new Payment();
        lPayment.setId(aToken.getString("payment_id"));
        
        PaymentExecution lPaymentExecution = new PaymentExecution();
        lPaymentExecution.setPayerId(aToken.getString("payer_id"));
        
        String lAccessToken = this.getAccessToken();
        APIContext lApiContext = new APIContext(lAccessToken);
        
        return lPayment.execute(lApiContext, lPaymentExecution);
    }

    public PaymentHistory listPayments(WebSocketConnector aConnector, Token aToken) throws Exception {
        HashMap lContainerMap = new HashMap<String, String>();
        Map lPagingData = aToken.getMap("paging");
       
        lContainerMap.put("start_index", lPagingData.get("start_index").toString());
        lContainerMap.put("count", lPagingData.get("count").toString());
        lContainerMap.put("sort_order", (String)lPagingData.get("sort_order"));
        
        PaymentHistory lResult  = Payment.list(getAccessToken(), lContainerMap);
        
        return lResult;
    }

    public Payment getPayment(WebSocketConnector aConnector, Token aToken) throws Exception {
        Payment lResult = Payment.get(getAccessToken(), aToken.getString("payment_id"));
        
        return lResult;
    }

    public Sale getSale(WebSocketConnector aConnector, Token aToken) throws Exception {
        Sale lResult = Sale.get(getAccessToken(), aToken.getString("transaction_id"));
        
        return lResult;
    }

    public Refund getRefundSale(WebSocketConnector aConnector, Token aToken) throws Exception {
        String lAccessToken = getAccessToken();
        
        Sale lSale = Sale.get(lAccessToken, aToken.getString("transaction_id"));
        Map lAmountData = (Map) aToken.getMap("amount");
        Amount lAmount = new Amount();
        lAmount.setCurrency((String)lAmountData.get("currency"));
        lAmount.setTotal((String)lAmountData.get("total"));
        
        Refund lRefund = new Refund();
        lRefund.setAmount(lAmount);
        
        return lSale.refund(lAccessToken, lRefund);
    }

    public Order createOrder(WebSocketConnector aConnector, Token aToken) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
