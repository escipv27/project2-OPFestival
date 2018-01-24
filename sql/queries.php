CREATE VIEW BOOTHENTRY AS
SELECT BASIC.one_id, BASIC.submittime, BASIC.name, BASIC.birthdate, BASIC.contactemail, BASIC.contacttwitter, BASIC.contactphone, BASIC.boothstatus, BASIC.portraitstatus, BASIC.tradecardstatus, BASIC.illuststatus, BOOTH.circlename, BOOTH.circlesize, BOOTH.circletype, BOOTH.circlegenre, BOOTH.circleinfo, BOOTH.circlegrade, BOOTH.circlenicknames, BOOTH.circledeposit
FROM BOOTH
INNER JOIN BASIC
ON BOOTH.one_id=BASIC.one_id;

.



CREATE VIEW CIRCLELIST AS
SELECT BOOTH.circleimage, BOOTH.circlename, BOOTH.name, BOOTH.circlenicknames, BOOTH.circlegenre, BOOTH.circletype, BOOTH.circlegrade, BOOTH.circleinfo, 
FROM BOOTH
INNER JOIN BASIC
ON BOOTH.one_id=BASIC.one_id;







SELECT * FROM BOOTH WHERE circlename < '가' ORDER BY circlename ASC
SELECT * FROM BOOTH WHERE (circlename RLIKE '^[ㄱㄲㄴㄷㄸ]' OR (circlename >=  '가' AND circlename <  '라')) ORDER BY circlename ASC
SELECT * FROM BOOTH WHERE (circlename RLIKE '^[ㄹㅁㅂㅃㅅㅆㅇ]' OR (circlename >=  '라' AND circlename <  '자')) ORDER BY circlename ASC
SELECT * FROM BOOTH WHERE (circlename RLIKE '^[ㅈㅉㅊㅋㅍㅌㅎ]' OR (circlename >=  '자')) ORDER BY circlename ASC



ALTER TABLE Persons AUTO_INCREMENT=100


SELECT * FROM BASIC
WHERE boothstatus='' AND tradecardstatus='' AND portraitstatus='' AND illuststatus=''


SELECT * FROM BASIC RIGHT JOIN LGC ON BASIC.one_id=LGC.one_id
WHERE BASIC.one_id>101; 


UPDATE BOOTH
SET boothstatus='승인'
WHERE boothstatus='승인대기'
AND one_id<>'' AND one_id<>'';



UPDATE TRADECARD
SET tradecardstatus='승인'
WHERE tradecardstatus='승인대기'
AND one_id<>'' AND one_id<>'' AND one_id<>'' AND one_id<>'' AND one_id<>'' AND one_id<>'';



UPDATE PORTRAIT
SET portraitstatus='승인'
WHERE portraitstatus='승인대기'
AND one_id<>'' AND one_id<>'';




CREATE VIEW PORTENTRY AS
SELECT BASIC.one_id, BASIC.submittime, BASIC.name, BASIC.birthdate, BASIC.contactemail, BASIC.contacttwitter, BASIC.contactphone, BASIC.boothstatus, BASIC.portraitstatus, BASIC.tradecardstatus, BASIC.illuststatus, 
PORTRAIT.portraitexp, PORTRAIT.portraitdesirechar, PORTRAIT.portraitavgworktime, PORTRAIT.portraitexpworktime
FROM PORTRAIT
INNER JOIN BASIC
ON PORTRAIT.one_id=BASIC.one_id;


CREATE VIEW TCARDENTRY AS
SELECT BASIC.one_id, BASIC.submittime, BASIC.name, BASIC.birthdate, BASIC.contactemail, BASIC.contacttwitter, BASIC.contactphone, BASIC.boothstatus, BASIC.portraitstatus, BASIC.tradecardstatus, BASIC.illuststatus, 
TRADECARD.tctypeA, TRADECARD.tctypeB, TRADECARD.tcdesirechar, TRADECARD.tcavgworktime, TRADECARD.tcexpworktime, TRADECARD.tcpassword
FROM TRADECARD
INNER JOIN BASIC
ON TRADECARD.one_id=BASIC.one_id;