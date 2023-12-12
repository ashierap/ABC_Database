DROP DATABASE IF EXISTS Game_Data;

CREATE DATABASE Game_Data;

USE Game_Data;

DROP TABLE IF EXISTS PLAYER_INFO;

CREATE TABLE PLAYER_INFO (
    PlayerId     SMALLINT NOT NULL AUTO_INCREMENT,
    FirstName    TINYTEXT,
    LastName     TINYTEXT,
    UserName     VARCHAR(50) UNIQUE,
    PRIMARY KEY (PlayerId)
);

DROP TABLE IF EXISTS SNAKE;

CREATE TABLE SNAKE (
    PlayerId     SMALLINT NOT NULL,
    Score        SMALLINT,
    Etime        TIME,
    Deaths       SMALLINT,
    PRIMARY KEY  (PlayerId),
    FOREIGN KEY  (PlayerId) REFERENCES PLAYER_INFO(PlayerId)
);

DROP TABLE IF EXISTS RPSLS;

CREATE TABLE RPSLS (
    PlayerId     SMALLINT NOT NULL,
    ScoreStreak  SMALLINT,
    Etime        TIME,
    Deaths       SMALLINT,
    PRIMARY KEY  (PlayerId),
    FOREIGN KEY  (PlayerId) REFERENCES PLAYER_INFO(PlayerId)
);

DROP TABLE IF EXISTS VENTURE;

CREATE TABLE VENTURE (
    PlayerId     SMALLINT NOT NULL,
    NumInputs    SMALLINT,
    Etime        TIME,
    Deaths       SMALLINT,
    PRIMARY KEY  (PlayerId),
    FOREIGN KEY  (PlayerId) REFERENCES PLAYER_INFO(PlayerId)
);

DROP TABLE IF EXISTS 1UPFROGGER;

CREATE TABLE 1UPFROGGER (
    PlayerId     SMALLINT NOT NULL,
    Score        SMALLINT,
    Etime        TIME,
    Deaths       SMALLINT,
    PRIMARY KEY  (PlayerId),
    FOREIGN KEY  (PlayerId) REFERENCES PLAYER_INFO(PlayerId)
);



INSERT INTO PLAYER_INFO (FirstName, LastName, UserName)
  VALUES('Thelonious', 'Monk', 'MONKEY_MAN');
INSERT INTO PLAYER_INFO (FirstName, LastName, UserName)
  VALUES('Sonny', 'Rollins', 'ROLLIN_STONED');
INSERT INTO PLAYER_INFO (FirstName, LastName, UserName)
  VALUES('Steve', 'Lehman', 'STEVE_JOBS');
INSERT INTO PLAYER_INFO (FirstName, LastName, UserName)
  VALUES('Cameron', 'Brown', 'KING_MAC');
INSERT INTO PLAYER_INFO (FirstName, LastName, UserName)
  VALUES('Ashiera', 'Preston', 'AP');


INSERT INTO SNAKE (PlayerId, Score, Etime, Deaths)
  VALUES(5, 20, '11:25:18', 5);
INSERT INTO SNAKE (PlayerId, Score, Etime, Deaths)
  VALUES(1, 5, '11:25:18', 2);
INSERT INTO SNAKE (PlayerId, Score, Etime, Deaths)
  VALUES(3, 7, '11:25:18', 4);
INSERT INTO SNAKE (PlayerId, Score, Etime, Deaths)
  VALUES(2, 8, '11:25:18', 8);
INSERT INTO SNAKE (PlayerId, Score, Etime, Deaths)
  VALUES(4, 5, '11:25:18', 10);


INSERT INTO RPSLS (PlayerId, ScoreStreak, Etime, Deaths)
  VALUES(5, 20, '11:25:18', 5);
INSERT INTO RPSLS (PlayerId, ScoreStreak, Etime, Deaths)
  VALUES(1, 5, '11:25:18', 2);
INSERT INTO RPSLS (PlayerId, ScoreStreak, Etime, Deaths)
  VALUES(3, 7, '11:25:18', 4);
INSERT INTO RPSLS (PlayerId, ScoreStreak, Etime, Deaths)
  VALUES(2, 8, '11:25:18', 8);
INSERT INTO RPSLS (PlayerId, ScoreStreak, Etime, Deaths)
  VALUES(4, 5, '11:25:18', 10);

INSERT INTO 1UPFROGGER (PlayerId, Score, Etime, Deaths)
  VALUES(5, 20, '11:25:18', 5);
INSERT INTO 1UPFROGGER (PlayerId, Score, Etime, Deaths)
  VALUES(1, 5, '11:25:18', 2);
INSERT INTO 1UPFROGGER (PlayerId, Score, Etime, Deaths)
  VALUES(3, 7, '11:25:18', 4);
INSERT INTO 1UPFROGGER (PlayerId, Score, Etime, Deaths)
  VALUES(2, 8, '11:25:18', 8);
INSERT INTO 1UPFROGGER (PlayerId, Score, Etime, Deaths)
  VALUES(4, 5, '11:25:18', 10);

INSERT INTO VENTURE (PlayerId, NumInputs, Etime, Deaths)
  VALUES(5, 20, '11:25:18', 5);
INSERT INTO VENTURE (PlayerId, NumInputs, Etime, Deaths)
  VALUES(1, 5, '11:25:18', 2);
INSERT INTO VENTURE (PlayerId, NumInputs, Etime, Deaths)
  VALUES(3, 7, '11:25:18', 4);
INSERT INTO VENTURE (PlayerId, NumInputs, Etime, Deaths)
  VALUES(2, 8, '11:25:18', 8);
INSERT INTO VENTURE (PlayerId, NumInputs, Etime, Deaths)
  VALUES(4, 5, '11:25:18', 10);