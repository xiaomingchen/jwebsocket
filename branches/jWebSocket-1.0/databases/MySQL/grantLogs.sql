/* This script creates the user jwsLog and grants him the rights to make 
 * CRUD operations on the logs database.
 * This database user is supposed to be used for logging purposes only!
 */

/* use this database schema */
create database if not exists jwebsocket_logs;
use `jwebsocket_logs`;

/*  grant access to all tables for sys user */
grant select,insert,delete,update on `jwebsocket_logs`.* to `jwsLog`@`localhost`;

/* necessary access to stored procedures */
grant execute on procedure `jwebsocket_logs`.`getSequence` to `jwsLog`@`localhost`;

/* special rights to create tables */
grant create on `jwebsocket_logs`.* to `jwsLog`@`localhost`;
grant drop on `jwebsocket_logs`.* to `jwsLog`@`localhost`;
