import React from 'react'

import PageBar from '../navbar/page_bar'
import GetOrdering from '../controls/ordering'
import GetLimit from '../controls/limit'
import GetManageModal from '../modals/manage'
import GetSearch from '../controls/search'

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
            <GetSearch placeholder={"test"} ctx={ctx}/>
            <GetOrdering ctx={ctx}/>
            <GetLimit ctx={ctx} type={"table"}/>
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
                                    <td key={i}>{val['column_name']}</td>
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
                                                    <th scope="row" key={j}>{getExtraDesc(build['extra_desc'], item[build['object_name']])}</th>
                                                );
                                            } else {
                                                return (
                                                    <th key={j}>{getExtraDesc(build['extra_desc'], item[build['object_name']])}</th>
                                                );
                                            }
                                        } else {
                                            return (
                                                <th key={j}><GetManageModal builder={builder} items={item} id={i}/></th>
                                            );
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
  