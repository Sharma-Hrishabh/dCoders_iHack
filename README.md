# dCoders
## Description
Our idea is about an online coding competition website based on balockchain. Where anonymously, users can participate in an event that is organized based on a threshold count of registrations. If enough members do not participate in the event that is scheduled, then it won't be organized. In our idea, a participant has to pay a nominal fee in the form of ether, bitcoin, other crypto-currency. The pooled crypto-currency will be distributed among the winning participants. Our portal will allow events to be held frequently and that too when people actually are ready to participate. This concept provides anonymous participation in coding competitions held regularly where winners get their prizes very qickly with the security features of blockchain.
We have developed this 'Coders Unknown Battle Portal'.

## Model design
![model](model.jpg)
* ### User-end
    1. Browser
    2. Metamask Extension
    3. web3js
* ### Server
    1. conventional database (storing code submissions and people pool)
    2. judge0 api (users' source code evaluation)
    3. web3js (interaction with blockchain for registration and winning transaction)
* ### Blockchain
    Already available on the ethereum platform
* ### API (judge0 api)
    Already available
    
## Pooling System
In the pooling system users are kind of listed for the event. At this stage no transaction is performed (transfer of crypto-currency). The time of event is already fixed and participants will be allowed make the payment before the event start time. Once enough number of people are listed, they have to do the transaction (transfer ether) of a significant amount in  a 30 minute span for participating in the event.

At the event start time a check is performed  if enough people have transacted to take part. If not, then the transaction will be reverted back to the already registered participants.

## The Event
Once enough people have transacted for the participation, the event will start. Questions for the event are displayed once the event start timme hits. The participants will submit their solution in an online ide and their submissions will be stored in our servers' database. On completion of the event, a winner will be decided based on the submissions made and the pooled ether (crypto-currency) will be distributed among the top performers.

## The Submission and Online Judge
The submissions to the event will be performed through our online ide. Our system will make use of an api of an online judge (namely, Judge0) to compile, run and check the submissions.
On submission, the source code and other required details are captured from client side and sent to our servers. Our servers make use of judge0 api to judge the submission. Each submission and its judgement result is stored in a conventional database.

## The Winners
On the completition of event, the top performers are decide based on the submissions

# Resolving known issues
-   mysql root password reset

    `sudo mysqld_safe --skip-grant-tables&
    sudo mysql --user=root mysql`
    https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
    mysql> `update user set authentication_string=PASSWORD('new-password') where user='root';
    flush privileges; quit`
    
    `sudo service mysql restart
    sudo mysql -u root -p`

# References
- [Creating Node.js Application](https://expressjs.com)
- [Render file](https://codeforgeek.com/2015/01/render-html-file-expressjs/)
- [Serve static file](https://www.youtube.com/watch?v=mW2NyglYpm8)
- [Add user and grant permissions to mysql](https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql)
- [Connect mysql to nodejs express server](https://expressjs.com/en/guide/database-integration.html#mysql)
- [Create SQL tables](https://dev.mysql.com/doc/refman/5.7/en/datetime.html)
- [Sleep in javascript](https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep)
- [Get access to accounts in privacy-mode](https://ethereum.stackexchange.com/questions/61709/metamask-warning)
- [Autoreload node server](https://stackoverflow.com/questions/1972242/how-to-auto-reload-files-in-node-js)
- [MYSQL in node-express](https://www.terlici.com/2015/08/13/mysql-node-express.html)
- Parse POST request in nodejs-express server [| Video](https://www.youtube.com/watch?v=rin7gb9kdpk) [| Doc](https://expressjs.com/en/resources/middleware/body-parser.html) [| Article](https://www.thepolyglotdeveloper.com/2015/10/create-a-simple-restful-api-with-node-js/)
- [MYSQL error str_to_date](https://stackoverflow.com/questions/5426413/incorrect-datetime-value-for-function-str-to-date)
