const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const data = require("./data.json")


chai.should();
chai.use(chaiHttp)
/*
 * Test case for Registration APIs
 */
describe('Registration API', () => {
     /*
     test case for successfully registration user, when registration into as per regex pettern and model of shema
    */
    it('whenGivenDetailsCorrectUserShuoldRegisterSuccessfully', (done) => {
        chai
            .request(server)
            .post('/register')
            .send(data.registration.user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('message').eql('User Registered successfully'),
                res.body.should.have.property('success').eql(true)
                done()
                if (err) {
                   return done(err)
                }
            })
       })

        /*
        * test case to check Duplicate user through email
        */
       it('whenGivenDetailsHaveDuplicateUserShuoldReturnUserExist', (done) => {
        chai
            .request(server)
            .post('/register')
            .send(data.registration.userDuplicateEmail)
            .end((err, res) => {
                res.should.have.status(409);
                res.body.should.have.property('message').eql('User already exits'),
                res.body.should.have.property('success').eql(false)
                done();
                if(err){
                    return done(err);
                }
            })
       })
        /*
        * test case to check user details without email
        */
        it('whenGivenDetailWithoutEmailShouldReturnEmailRequired', (done) => {
            chai
                .request(server)
                .post('/register')
                .send(data.registration.withoutEmail)
                .end((err, res) => {
                    res.body.should.have.property('message').eql('"email" is required'),
                    res.body.should.have.property('success').eql(false)
                    done();
                    if(err){
                        return done(err);
                    }
                })
           })
        /*
        * test case to check user details without firstName
        */
        it('whenGivenDetailWithoutFirstNameShouldReturnFirstNameRequired', (done) => {
            chai
                .request(server)
                .post('/register')
                .send(data.registration.withoutFn)
                .end((err, res) => {
                    res.body.should.have.property('message').eql('"firstName" is required'),
                    res.body.should.have.property('success').eql(false)
                    done();
                    if(err){
                        return done(err);
                    }
                })
           })
            /*
        * Test case to check regex pattern with user first name if it is does not match
        * then res shold be status(422).
        */
       it('WhenGivenEmailDoesNotMatchwithRegexShouldReturnStatus(422)', () => {
        chai
            .request(server)
            .post('/register')
            .send(data.registration.userWrongFn)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.have.property('success').eql(false)
            });
       })
   })


/*
 * Tase case for login APIs
 */   

describe('Login API', () => {
    /*
     test case for successfully looged in, when login info match with registration password and email
    */
    it('whenGivenLoginInfoCorrectUserShouldLoggedInSuccessfully', () => {
        chai
            .request(server)
            .post('/login')
            .send(data.userLogin.loginInfo)
            .end((res) => {
                res.should.have.status(201);
                res.body.should.have.property('message').eql('User logged in successfully'),
                res.body.should.have.property('success').eql(true)
            })
    })
     /*
     test case for unable to looged in, when login info does not match with registration password.
    */
    it('WhenGivenLoginInfoPasswordWrongShouldReturnUnableToLoging', () => {
        chai
            .request(server)
            .post('/login')
            .send(data.userLogin.wrongPassLI)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property('success').eql(false),
                res.body.should.have.property('message').eql('Unable to login. Please enter correct info')
            });
       })

       /*
        * Test case to check regex pattern with user password if it is does not match
        * then res shold be status(422).
        */
       it('WhenGivenPasswordDoesNotMatchwithRegexShouldReturnStatus(422)', () => {
        chai
            .request(server)
            .post('/login')
            .send(data.userLogin.wrongPassWithER)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.have.property('success').eql(false)
            });
       })
       /*
        * Test case to check regex pattern with user email if it is does not match
        * then res shold be status(422).
        */
       it('WhenGivenEmailDoesNotMatchwithRegexShouldReturnStatus(422)', () => {
        chai
            .request(server)
            .post('/login')
            .send(data.userLogin.wrongEmailWithER)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.have.property('success').eql(false)
            });
       })
    })
