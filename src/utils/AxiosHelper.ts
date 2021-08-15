import axios, { CancelTokenSource } from "axios";
import { ResponseObject, iResponseObject } from './models/Response';

const AxiosHelper = {

    getSource: () => {
        return axios.CancelToken.source()
    }, //return token to cancel the request


    //get the object 
    getData: <T>(url: string, source: CancelTokenSource): Promise<iResponseObject<T>> => {
        return new Promise((resolve, reject) => {
            axios
                .get(`${url}`, {
                    cancelToken: source.token,
                })
                .then((res) => {
                    const { error, message, data } = res.data;
                    if (error === false) {
                        //no error
                        resolve(
                            ResponseObject(true, "success" + message, data)
                        );
                    } else {
                        resolve(
                            ResponseObject(false, "failed" + message)
                        );
                    }
                })
                .catch((e) => {
                    console.error("getData error: ", e)
                    if (axios.isCancel(e)) {
                        resolve(
                            ResponseObject(false, "failed canceled the request")
                        );
                    } else {
                        resolve(
                            ResponseObject(false, "failed" + e.message)
                        );
                    }
                });
        });
    },//get end 

    addData: <T>(url: string, newdata: T): Promise<iResponseObject<T>> => {
        return new Promise((resolve, reject) => {
            axios
                .post(url, newdata)
                .then((res) => {
                    const { error, message, data } = res.data;
                    if (error === false) {
                        //no error
                        resolve(
                            ResponseObject(true, "success-" + message, data)
                        );
                    } else {
                        //error
                        resolve(
                            ResponseObject(false, "failed-" + message)
                        );
                    }
                })
                .catch((e) => {
                    console.error("addData error: ", e)
                    resolve(
                        ResponseObject(false, "failed-" + e.message)
                    );
                });
        });
    }, //end add data

    updateData: <T>(url: string, updateData: T): Promise<iResponseObject<T>> => {
        return new Promise((resolve, reject) => {
            axios.put(url, updateData).then((res) => {
                const { error, message, data } = res.data
                if (error === false) {
                    resolve(ResponseObject(true, "update success-" + message, data));
                } else {
                    resolve(
                        ResponseObject(false, "failed-" + message)
                    );
                }
            }).catch((e) => {
                console.error("updateData error: ", e)
                resolve(
                    ResponseObject(false, "failed-" + e.message)
                );
            })
        });
    },//end update data

    deleteData: (url: string): Promise<iResponseObject<any>> => {
        return new Promise((resolve, reject) => {
            axios.delete(url).then((res) => {
                const { error, message, data } = res.data
                if (error === false) {
                    resolve(ResponseObject(true, "delete succes" + message));
                } else {
                    resolve(
                        ResponseObject(false, "failed" + message)
                    );
                }
            }).catch((e) => {
                console.error("deleteData error: ", e)
                resolve(
                    ResponseObject(false, "failed" + e.message)
                );
            })
        });
    },//end update data

}

//use case
//await AxiosHelper.getData<User>('', AxiosHelper.getSource())
//await AxiosHelper.addData<User>('', new User(1, "name", "email"))
//await AxiosHelper.updateData<User>('', new User(1, "name2", "email2"))
//await AxiosHelper.deleteData('')


export default AxiosHelper