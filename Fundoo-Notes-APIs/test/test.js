const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const data = require("./data.json")

chai.should();
chai.use(chaiHttp)

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
   })

describe('Login API', () => {
    /*
     test case for successfully looged in, when login info match with registration password and email
    */
    it('whenGivenLoginInfoCorrectUserShouldLoggedInSuccessfully', (done) => {
        chai
            .request(server)
            .post('/login')
            .send(data.userLogin.loginInfo)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('message').eql('User logged in successfully'),
                res.body.should.have.property('success').eql(true)
                done()
                if (err) {
                    return done(err)
                }
            })
    })
     /*
     test case for unable to looged in, when login info does not match with registration password.
    */
    it('WhenGivenLoginInfoPasswordWrongShouldReturnUnableToLoging', (done) => {
        chai
            .request(server)
            .post('/login')
            .send(data.userLogin.wrongPassLI)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property('success').eql(false),
                res.body.should.have.property('message').eql('Unable to login. Please enter correct info')
                done()
                if (err) {
                    return done(err)
                }
            });
       })
    })
