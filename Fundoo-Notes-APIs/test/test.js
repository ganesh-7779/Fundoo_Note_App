const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe('Registration API', () => {
    it('It should not update/Post without registration Details', (done) => {
        let registrationDetails = {
            "firstName": "Ganesh",
            "lastName": "Ganesh",
            "email": "ganesh9@gmail.com",
            "password": "ganefghG@7"
        }
        chai
            .request(server)
            .post('/register')
            .send(registrationDetails)
            .end((err, res) => {
                res.should.have.status(201);
                done()
            })
        })
    })
   
    describe('Login API', () => {
        it('It should not update/Post without LongIn Details', (done) => {
            let loninDetails = {
                "email": "ganesh9@gmail.com",
                "password": "ganefghG@7"
            }
            chai
                .request(server)
                .post('/login')
                .send(loninDetails)
                .end((err, res) => {
                    res.should.have.status(201);
                    done()
                })
            })
        })