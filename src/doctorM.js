import {
    PersonM
} from './personM';

export function promote() {
    console.log('promote');
}
export default class DoctorM extends PersonM {

    constructor(name, degree) {
        super(name);
        this.degree = degree;
    }
    appointment() {
        console.log('appointment');
    }

}