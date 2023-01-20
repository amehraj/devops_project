import { expect } from 'chai';
import axios from 'axios';

describe('APIs', function() {
    it('Get running state', async function() {
        const response = await axios.get("http://docker:8083/state")
        expect(response.data).to.equal("RUNNING");
        
    });
    it('Get paused state', async function() {
        setTimeout(() => {
        }, "2000")
        let data = ''
        const HEADER = {
          headers: { Accept: 'application/json' },
        }
        const DATA = {
            "state" : "PAUSED"
        }
        const response = await axios.put("http://docker:8083/state", DATA, HEADER)
        const response2 = await axios.get("http://docker:8083/state")
        expect(response2.data).to.equal("PAUSED");
    });   
    it('Get paused state', async function() {
        setTimeout(() => {
        }, "2000")
        let data = ''
        const HEADER = {
          headers: { Accept: 'application/json' },
        }
        const DATA = {
            "state" : "PAUSED"
        }
        const response = await axios.put("http://docker:8083/state", DATA, HEADER)
        const response2 = await axios.get("http://docker:8083/state")
        expect(response2.data).to.equal("PAUSED");
    });
    it('Get resume state', async function() {
        setTimeout(() => {
        }, "2000")
        let data = ''
        const HEADER = {
          headers: { Accept: 'application/json' },
        }
        const DATA = {
            "state" : "RUNNING"
        }
        const response = await axios.put("http://docker:8083/state", DATA, HEADER)
        const response2 = await axios.get("http://docker:8083/state")
        expect(response.data).to.equal("RUNNING");
    });
});