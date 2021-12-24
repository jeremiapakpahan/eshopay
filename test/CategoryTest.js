import server from '../server/index'
import chai from 'chai'
import chaiHttp from 'chai-http';


//assetion
chai.should();
chai.use(chaiHttp);

//describe unit testing
describe('Category APIs',()=>{

    describe('Test Get route /api/category', () =>{
         
        it("It should return all category",(done)=>{
            chai.request(server)
            .get("/eshopay/api/category")
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('array')
                response.body.length.should.not.be.eq(0);
                done();
            })
        })


        it("It should return 404",(done)=>{
            chai.request(server)
            .get("/api/region")
            .end((err,response)=>{
                response.should.have.status(404);
                done();
            })
        })
    })


})