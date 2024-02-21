// Modules CSS
import style from './containers.module.css'
import { parseJSON } from '@/modules/helpers/decode'

import { goToPage } from '../../modules/helpers/others'
import { numberToPrice } from '@/modules/helpers/converter'

export default function GetGoodsContainer({builder}) {
    return <div className='col-lg-3 col-md-4 col-sm-6 mx-auto'>
        <div className={style.goods_box} onClick={() => goToPage('goods/'+builder['goods_slug'])}>
            <img src="/assets/goods.png" style={{width:"200px"}}/>
            <p className='my-0' style={{fontSize:"var(--textXLG)"}}>{builder['goods_name']}</p>
            <h4>{'Rp. ' + numberToPrice(builder['goods_price'])}</h4>
        </div>
    </div>
}