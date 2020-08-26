package com.bcafinance.rafidahlia.testing.Request;

import com.bcafinance.rafidahlia.testing.Entity.User;

public class UserAgencyReq extends User {
    private String agencyName;
    private String agencyDetails;
    private String contactNumb;

    public String getAgencyName() {
        return agencyName;
    }

    public void setAgencyName(String agencyN) {
        agencyName = agencyN;
    }

    public String getAgencyDetails() {
        return agencyDetails;
    }

    public void setAgencyDetails(String agencyD) {
        agencyDetails = agencyD;
    }

    public String getContactNumb() {
        return contactNumb;
    }

    public void setContactNumb(String contactN) {
        contactNumb = contactN;
    }
}
