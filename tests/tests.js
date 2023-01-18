import { expect } from 'chai';
import axios from 'axios';

describe('APIs', function() {
    it('Get running state', function() {
        let data = ''
        const HEADER = {
          headers: { Accept: 'text/plain' },
        }
        axios
          .get('http://localhost:8083/state', HEADER)
          .then((response) => {
              data = response.data
              expect(data).to.equal("RUNNING");
          })
          .catch((e) => {
            console.error(e)
          })
        
    });
    it('Get paused state', function() {
        setTimeout(() => {
        }, "2000")
        let data = ''
        const HEADER = {
          headers: { Accept: 'application/json' },
        }
        const DATA = {
            "state" : "PAUSED"
        }
        axios
        .put('http://localhost:8083/state', DATA, HEADER)
        .then((response) => {
        }).then(() => {
            axios
            .get('http://localhost:8083/state', HEADER)
            .then((response) => {
                data = response.data
                expect(data).to.equal("PAUSED");
            })
            .catch((e) => {
            })
        })
        .catch((e) => {
        })
    });
    it('Get resume state', function() {
        setTimeout(() => {
        }, "2000")
        let data = ''
        const HEADER = {
          headers: { Accept: 'application/json' },
        }
        const DATA = {
            "state" : "RUNNING"
        }
        axios
        .put('http://localhost:8083/state', DATA, HEADER)
        .then((response) => {
            data = response.data
        }).then(() => {
            axios
            .get('http://localhost:8083/state', HEADER)
            .then((response) => {
                data = response.data
                expect(data).to.equal("PAUSED");
            })
            .catch((e) => {
            })
        })
        .catch((e) => {
        })
    });
});