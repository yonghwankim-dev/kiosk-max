package com.kiosk.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class KioskWebApplicationRunner implements ApplicationRunner {

    private static final Logger logger = LoggerFactory.getLogger(KioskWebApplicationRunner.class);

    @Value("${MYSQL_HOST}")
    private String host;

    @Value("${MYSQL_PORT}")
    private int port;

    @Value("${MYSQL_DATABASE}")
    private String database;

    @Value("${MYSQL_USER}")
    private String mysql_user;

    @Override
    public void run(ApplicationArguments args) {
        logger.info("host : {}", host);
        logger.info("port : {}", port);
        logger.info("database : {}", database);
        logger.info("mysql_user : {}", mysql_user);
    }
}
