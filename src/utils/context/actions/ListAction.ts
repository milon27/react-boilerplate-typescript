import axios, { CancelTokenSource } from "axios";
import ApiResponse, { iApiResponse } from "../../models/ApiResponse";
import { iListAction } from "../reducers/ListReducer";
import Types from "./Types";


class ListAction<T> {
    dispatch: React.Dispatch<iListAction<T>>
    // source: CancelTokenSource = axios.CancelToken.source()

    constructor(dispatch: React.Dispatch<iListAction<T>>) {
        this.dispatch = dispatch;
    }
    static getSource = (): CancelTokenSource => {
        return axios.CancelToken.source();
    }; //return token to cancel the request

    //get all data
    getAll = async (url: string, source: CancelTokenSource): Promise<iApiResponse<T[]>> => {
        return new Promise((resolve, reject) => {
            axios
                .get(`${url}`, {
                    cancelToken: source.token,
                })
                .then((res) => {
                    const { error, message, response }: iApiResponse<T[]> = res.data;
                    if (error === false) {
                        //no error
                        //dispatch the global state
                        // console.log("get all res-: ", response)
                        this.dispatch({
                            type: Types.GET_DATA,
                            payload: response as T[], //an array
                        });
                        resolve(
                            ApiResponse(false, "success" + message, response)
                        );
                    } else {
                        this.dispatch({
                            type: Types.GET_DATA,
                            payload: [] as T[], //an array
                        });
                        console.log("get list server error", message);
                        resolve(ApiResponse(true, "Failed" + message, [] as T[]));
                    }
                })
                .catch((e) => {
                    if (axios.isCancel(e)) {
                        console.log("cancel the request.");
                    } else {
                        console.log("get list error", e);
                    }
                    this.dispatch({
                        type: Types.GET_DATA,
                        payload: [] as T[], //an array
                    });
                    resolve(ApiResponse(true, "Failed" + e.message, [] as T[]));
                });
        });
    }; //end get all(make sure you got a response (object type) )

    addData = (url: string, newdata: T): Promise<iApiResponse<T>> => {
        return new Promise((resolve, reject) => {

            axios
                .post(url, newdata)
                .then((res) => {
                    const { error, message, response }: iApiResponse<T> = res.data;
                    if (error === false) {
                        //no error
                        //dispatch the global state
                        this.dispatch({
                            type: Types.ADD_DATA,
                            payload: response as T //a newly created object
                        });

                        resolve(ApiResponse(false, "success" + message, response));
                    } else {
                        //error
                        console.log("list add server error: ", message)
                        resolve(ApiResponse(true, "Failed" + message, {} as T));
                    }
                })
                .catch((e: Error) => {
                    console.log("list add error: ", e)
                    resolve(ApiResponse(true, "Failed" + e.message, {} as T));
                });
        });
    }; //end add data
    //id_field=primary key (based on which field item will be identified)
    updateData = (url: string, updateData: T, id_field: string): Promise<iApiResponse<T>> => {
        return new Promise((resolve, reject) => {
            axios.put(url, updateData).then((res) => {
                const { error, message, response }: iApiResponse<T> = res.data
                console.log("after update: ", res.data);
                if (error === false) {
                    //dispatch the global state
                    this.dispatch({
                        type: Types.UPDATE_DATA,
                        payload: {
                            id_field: id_field,
                            obj: response as T
                        }
                    });
                    resolve(ApiResponse(false, "success" + message, response));
                } else {
                    console.error("list update server error: ", message)
                    resolve(ApiResponse(true, "Failed" + message, {} as T));
                }
            }).catch((e: Error) => {
                console.error("list update error: ", e)
                resolve(ApiResponse(true, "Failed" + e.message, {} as T));
            })
        });
    } //end update data
    // Delete Data
    deleteData = (url: string, id_field: string, obj: T, body?: object): Promise<iApiResponse<T>> => {
        return new Promise((resolve, reject) => {
            axios
                .delete(url, {
                    data: body
                })
                .then((res) => {
                    const { error, message, response }: iApiResponse<any> = res.data;
                    if (error === false) {
                        //dispatch the global state
                        this.dispatch({
                            type: Types.DELETE_DATA,
                            payload: { id_field: id_field, obj: obj },
                        });
                        resolve(ApiResponse(false, "success" + message, obj))
                    } else {
                        console.error("list delete server error: ", message)
                        resolve(ApiResponse(true, "Failed" + message, response));
                    }
                })
                .catch((e: Error) => {
                    console.error("list delete error: ", e);
                    resolve(ApiResponse(true, "Failed" + e.message, obj));
                });
        });
    }; //end Delete data
}

export default ListAction;