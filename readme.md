!!! How to run this application:

- Activate the virtual environment
  python -m venv venv
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
  .\venv\Scripts\activate

- Install all of the required packages:
  py -m pip install -r requirements.txt

- If you want to see what packages are installed:
  py -m pip list

- Use following command to run the application on server:
  py -m flask run

· Context and architecture of the application from both production and technique perspectives.

The Adventure Ride

1. Purpose. “An Adventure Ride” is a chat-based game whose purpose is to provide players with an immersive adventure gaming experience. The games follow the story of a young courageous, fearless, savvy and undaunted girl as she embarks on her first ever solo trip to explore the virgin and wild beauty in the continent of Africa. During her adventure packed journey, she encounters various challenging situations and as a player, one will get engaged in participating the game by making choices for her at various decision points through her journey. The main purposes of the “An Adventure Ride” game are:
   a) Adventure and Exploration: This game provides players with an adventure-filled experience. Players navigate different locations, solve puzzles, and uncover secrets as they progress through the game's storyline.
   b) Storytelling: This game excels at storytelling. It offers engaging narratives with intriguing plot twists, memorable characters, and humorous dialogue. The game is based on real travel experiences of the author, so it creates a unique and captivating story.
   c) Problem Solving: The games challenge players with a variety of life problems and tricky situations to deal with. These problems range from logic-based challenges to inventory-based item combinations. Players must think creatively and use their problem-solving skills to progress through the game.
   d) Sharing Experience: The users have the option to share their experiences after playing the game and at the same time can view the feedback shared by other users.

2. Features. The chat based web application offers following features:

a) User Account Operations. Users can create new accounts by registering, login , logout view their profile, and edit their profile.
b) User Feedback. Users can share feedback about their gaming experience and view other users’ feedback as well. They can also search through all the shared feedback for a particular keyword.
c) Play Game. Users can start a new game, interact with the application by selecting their choices during the game, save their choices as history which they can access on the next login, take notes for things to remember while playing the game. They could also search for keywords while playing the game, but this has been restricted to once as part of the storyline of the game.
d) Following and Unfollowing. Users have the freedom to follow and unfollow other users based on their profiles or feedback shared.

3. Design. We have used following components for development of this web application:
   a) Front End – HTML, CSS, JavaScript, AJAX
   b) Back End - Flask
   c) Database – SQLite 3

4. Architecture of the Web Application:

There are three main tables in the data “app.db”——
Table 1, User
This table collects basic information of registered users.
Column          Type            Comment
Id              INTEGER         Unique. Primary Key
Username        VARCHAR(64)
Email           VARCHAR(120)
Password        VARCHAR(128)
About_me        VARCHAR(140)
Last_seen       DATETIME        Timestamp
Last_game       VARCHAR(1000)   Previous options + Timestamp

Table 2, Post
This table collects the post of comments from users.
Column      Type            Comment
Id          INTEGER Post    id
Body        VARCHAR(140)    The content of comments
Timestamp   DATETIME
User_id     INTEGER         Same as user.id, Foreign Key

Table 3, Followers
This table is created for the future establishment of community.
Column          Type        Comment
Follower_id     INTEGER
Followed_id     INTEGER

5. Launching the application. Following packages are needed to be installed for launching the application: -
   alembic==1.11.1
   blinker==1.6.2
   certifi==2023.5.7
   click==8.1.3
   colorama==0.4.6
   dnspython==2.3.0
   elastic-transport==8.4.0
   elasticsearch==8.7.0
   email-validator==2.0.0.post2
   Flask==2.3.2
   Flask-Login==0.6.2
   Flask-Migrate==4.0.4
   Flask-SQLAlchemy==3.0.3
   Flask-WTF==1.1.1
   greenlet==2.0.2
   idna==3.4
   itsdangerous==2.1.2
   Jinja2==3.1.2
   Mako==1.2.4
   MarkupSafe==2.1.2
   python-dotenv==1.0.0
   SQLAlchemy==2.0.15
   typing_extensions==4.5.0
   urllib3==1.26.15
   Werkzeug==2.3.4
   WTForms==3.0.1

6. Unit Testing. The unit tests are stored in the file named as tests.py and the following command needs to be executed to run the tests file:
   > python tests.py

Following four test cases have been designed for this web application as a sample for unit testing.

a) test_password_hashing method creates a user, sets a password for that user, and then verifies that the password verification functions correctly by checking if different passwords (such as 'dog' and 'cat') match or not. This ensures that the password hashing and verification mechanisms in the User model are working as expected.

b) test_avatar method creates a user with a specific username and email, and then verifies that the generated avatar URL for the user with a size of 128 pixels matches the expected URL. This ensures that the avatar generation functionality in the User model is working correctly.

c) test_follow method is a unit test that verifies the functionality of following and unfollowing users in the User model.

d) test_follow_posts method is a unit test that verifies the functionality of retrieving followed posts for each user in the User model.

7. Validation Testing. Following validation tests have been designed in the application:

1) Signing in without entering both username and password.
2) Signing in without entering password.
3) Signing in with invalid username or password.
4) Registering with invalid email id format.
5) Passwords not matching while registering user.
6) Submitting feedback without filling in the field.
7) Using username identical to an already registered user while registering for first time as well as editing profile.

8. Git Commit Log. Git commit log is given below:



9. Reference

https://blog.miguelgrinberg.com/

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise

https://javascript.info/async-await

https://play.aidungeon.io/main/scenarioPlay?publicId=757977e0-6349-11ec-b65a-a9045c21f45d&isCustomStart=false

https://www.iconfont.cn/collections/index?spm=a313x.7781069.1998910419.3
