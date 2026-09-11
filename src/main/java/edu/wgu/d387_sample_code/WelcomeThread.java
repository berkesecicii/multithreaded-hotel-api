package edu.wgu.d387_sample_code;

import java.util.Locale;
import java.util.ResourceBundle;

public class WelcomeThread implements Runnable {

    private Locale locale;
    private String message;

    public WelcomeThread(Locale locale) {
        this.locale = locale;
    }

    public String getMessage() {
        return message;
    }

    @Override
    public void run() {
        ResourceBundle bundle = ResourceBundle.getBundle("translation", locale);
        message = bundle.getString("welcome");
    }
}