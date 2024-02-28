import React from 'react'

import PageBar from '../navbar/page_bar'
import GetManageModal from '../modals/manage'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from "@fortawesome/free-solid-svg-icons"

export default function GetGeneralTable({builder, items, maxPage, currentPage, ctx}) {
    function getExtraDesc(ext, val){
        if(ext != null){
            if(ext['pos'] == "start"){
                return `${ext['desc']} ${val}`
            } else if(ext['pos'] == "end") {
                return `${val} ${ext['desc']}`
            } 
        } else {
            return val
        }
    }

    return (
        <div className='custom-tbody'>
            <table className="table">
                <thead>
                    <tr key={"a"}>
                    {
                        builder.map((val, i, index) => {
                            if(i == 0){
                                return (
                                    <th scope="col" key={i}>{val['column_name']}</th>
                                );
                            } else {
                                return (
                                    <th key={i}>{val['column_name']}</th>
                                );
                            }
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item, i, idx) => {
                            return (
                                <tr key={i}>
                                {
                                    builder.map((build, j, ins) => {
                                        if(item[build['column_name']] != 'Manage' && item[build['object_name']] != null){
                                            if(i == 0){
                                                return (
                                                    <td scope="row" key={j}>{getExtraDesc(build['extra_desc'], item[build['object_name']])}</td>
                                                );
                                            } else {
                                                return (
                                                    <td key={j}>{getExtraDesc(build['extra_desc'], item[build['object_name']])}</td>
                                                );
                                            }
                                        } else {
                                            if(item[build['path']] != null){
                                                return (
                                                    <td key={j}>
                                                        <a className="btn btn-primary py-3 px-4" href={"/catalog/"+item['catalog_type']+"/"+item[build['path']]}><FontAwesomeIcon icon={faEdit}/></a>
                                                    </td>
                                                );
                                            } else {
                                                return (
                                                    <td key={j}><GetManageModal builder={builder} items={item} id={i}/></td>
                                                );
                                            }
                                        }
                                    })
                                }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <PageBar curr={currentPage} max={maxPage} ctx={ctx}/>
        </div>
    );
}
  