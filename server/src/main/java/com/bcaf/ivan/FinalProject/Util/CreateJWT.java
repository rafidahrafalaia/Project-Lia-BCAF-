package com.bcaf.ivan.FinalProject.Util;

import com.bcaf.ivan.FinalProject.Entity.User;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class CreateJWT {
    public String buildJWT(User user, String agencyId){
        SignatureAlgorithm signatureAlgorithm=SignatureAlgorithm.HS256;

        long nowMillis=System.currentTimeMillis();
        Date now = new Date(nowMillis);

        byte[] apiKeySecretBytes= DatatypeConverter.parseBase64Binary("hash");
        Key signingKey=new SecretKeySpec(apiKeySecretBytes,signatureAlgorithm.getJcaName());

        Map dataUser = new HashMap<String,Object>();
        dataUser.put("userId",user.getId());
        dataUser.put("name",user.getFirstName() + "" + user.getLastName());
        dataUser.put("email", user.getEmail());
        dataUser.put("agencyId", agencyId);

        JwtBuilder builder= Jwts.builder()
                .setClaims(dataUser)
                .setIssuedAt(now)
                .signWith(signatureAlgorithm,signingKey);

            long expMillis=nowMillis + 31536000000L;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp);


        return builder.compact();
    }
}
