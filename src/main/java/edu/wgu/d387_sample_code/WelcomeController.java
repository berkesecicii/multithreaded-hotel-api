package edu.wgu.d387_sample_code;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Locale;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/welcome")
public class WelcomeController {

    @GetMapping
    public String[] getWelcomeMessages() {
        WelcomeThread englishThread = new WelcomeThread(Locale.US);
        WelcomeThread frenchThread = new WelcomeThread(Locale.CANADA_FRENCH);

        Thread thread1 = new Thread(englishThread);
        Thread thread2 = new Thread(frenchThread);

        thread1.start();
        thread2.start();

        try {
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return new String[]{englishThread.getMessage(), frenchThread.getMessage()};
    }
}