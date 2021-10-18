import axios, { CancelTokenSource } from "axios";
import ApiResponse, { iApiResponse } from "./models/ApiResponse";

const AxiosHelper = {

    simpleGet: (url: string) => {
        return axios.get(`${url}`)
    },

    getSource: () => {
        return axios.CancelToken.source()
    }, //return token to cancel the request

    //get the object 
    getData: <T>(url: string, source: CancelTokenSource): Promise<iApiResponse<T>> => {
        return new Promise((resolve, reject) => {
            axios
                .get(`${url}`, {
                    cancelToken: source.token,
                })
                .then((res) => {
                    const { error, message, response } = res.data;
                    if (error === false) {
                        //no error
                        resolve(
                            ApiResponse(false, "success" + message, response)
                        );
                    } else {
                        resolve(ApiResponse(true, "failed" + message));
                    }
                })
                .catch((e) => {
                    console.error("getData error: ", e)
                    if (axios.isCancel(e)) {
                        resolve(ApiResponse(true, "failed canceled the request"));
                    } else {
                        resolve(ApiResponse(true, "failed" + e.message));
                    }
                });
        });
    },//get end 

    addData: <T>(url: string, newdata: T | any): Promise<iApiResponse<T>> => {
        return new Promise((resolve, reject) => {
            axios
                .post<iApiResponse<T>>(url, newdata)
                .then((res) => {
                    const { error, message, response } = res.data;
                    if (error === false) {
                        //no error
                        resolve(
                            ApiResponse(false, "success-" + message, response)
                        );
                    } else {
                        //error
                        resolve(ApiResponse(true, "failed" + message));
                    }
                })
                .catch((e) => {
                    console.error("addData error: ", e)
                    resolve(ApiResponse(true, "failed" + e.message));
                });
        });
    }, //end add data

    updateData: <T>(url: string, updateData: T | any): Promise<iApiResponse<T>> => {
        return new Promise((resolve, reject) => {
            axios.put<iApiResponse<T>>(url, updateData).then((res) => {
                const { error, message, response } = res.data
                if (error === false) {
                    resolve(ApiResponse(false, "update success-" + message, response));
                } else {
                    resolve(ApiResponse(true, "failed-" + message));
                }
            }).catch((e) => {
                console.error("updateData error: ", e)
                resolve(ApiResponse(true, "failed-" + e.message));
            })
        });
    },//end update data

    deleteData: (url: string): Promise<iApiResponse<any>> => {
        return new Promise((resolve, reject) => {
            axios.delete(url).then((res) => {
                const { error, message, response } = res.data
                if (error === false) {
                    resolve(ApiResponse(false, "delete succes" + message));
                } else {
                    resolve(
                        ApiResponse(true, "failed" + message)
                    );
                }
            }).catch((e) => {
                console.error("deleteData error: ", e)
                resolve(ApiResponse(true, "failed" + e.message));
            })
        });
    },//end update data

    downloadFile: (url: string, filenameWithExt: string) => {
        //headers: { 'Accept': 'application/vnd.ms-excel' }
        axios({
            url: url,
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filenameWithExt);
            document.body.appendChild(link);
            link.click();
        });
    }
}

//use case
//await AxiosHelper.getData<User>('', AxiosHelper.getSource())
//await AxiosHelper.addData<User>('', new User(1, "name", "email"))
//await AxiosHelper.updateData<User>('', new User(1, "name2", "email2"))
//await AxiosHelper.deleteData('')


export default AxiosHelper