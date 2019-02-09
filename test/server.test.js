"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chaiHttp = require('chai-http');
const server = require('../server');
const quotes = require('../models/quote');
const chai = require('chai');
const should = chai.should();

chai.use(chaiHttp);

   describe('/GET/api/getQuotes', () => {

     afterEach((done) => {
         quotes.deleteOne({}, (err) => {
           done();
         });
      });

       it('it should GET quotes from database', (done) => {
           const obj = {quote : 'quote 1', author: 'author 1'};
           let quote = new quotes(obj);
           quote.save((err, url) => {
              chai.request(server)
             .get('/api/getQuotes')
             .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   res.body.should.have.property('success').eql(true);
                   res.body.should.have.property('data');
                   res.body.data.should.be.a('array');
                   res.body.data[0].should.have.property('author').eql('author 1');
                   res.body.data[0].should.have.property('quote').eql('quote 1');
               done();
             });
           });

       });

       it('it should GET all quotes from database with multiple entries', (done) => {
           let entry1 = new quotes({quote : 'quote 1', author: 'author 1'});
           const obj = {quote : 'quote 2', author: 'author 2'};
           let quote = new quotes(obj);
           entry1.save(() => {
             quote.save((err, url) => {
                chai.request(server)
               .get('/api/getQuotes')
               .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.should.have.property('success').eql(true);
                     res.body.should.have.property('data');
                     res.body.data.should.be.a('array');
                     res.body.data.should.have.length(2);
                     res.body.data[1].should.have.property('author').eql('author 2');
                     res.body.data[1].should.have.property('quote').eql('quote 2');
                     done();
               });
           });
           });
        });

        it('it should respond with empty data on empty database', (done) => {
              quotes.deleteOne({}, (err) => {
              });
               chai.request(server)
              .get('/api/getQuotes')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('data');
                    res.body.data.should.be.an('array').that.is.empty;
                done();
              });
        });

        //After all tests are finished drop database and close connection
         after(function(done){
           mongoose.connection.db.dropDatabase(function(){
             mongoose.connection.close(done);
           });
         });
   });
