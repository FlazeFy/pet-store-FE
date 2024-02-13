// Modules CSS
import style from './containers.module.css'
import { parseJSON } from '@/modules/helpers/decode'

import { goToPage } from '../../modules/helpers/others'

export default function GetShelfContainer({builder}) {
    let tagArr = []
    if(builder['shelfs_tag']){
        tagArr = parseJSON(builder['shelfs_tag'])
    }
    
    return <div className='col-lg-3 col-md-4 col-sm-6 mx-auto'>
        <div className={style.shelf_box} onClick={() => goToPage('shelf/'+builder['shelfs_slug'])}>
            <h5>{builder['shelfs_name']}</h5>
            {
                tagArr.map((tg, i, idx) => {
                    return (
                        <>{tg['tag_name']}, </>
                    )
                })
            }
        </div>
    </div>
}