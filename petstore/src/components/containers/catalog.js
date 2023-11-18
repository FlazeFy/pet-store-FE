// Modules CSS
import style from './containers.module.css'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus} from "@fortawesome/free-solid-svg-icons"
import { htmlDecode } from '@/modules/helpers/decode'
import { numberToPrice } from '@/modules/helpers/converter'

export default function GetCatalogContainer({builder}) {
    return <div className='col-lg-4 col-md-3 col-sm-12'>
        <div className={style.cat_cont}>
            <div>
                <img className={style.cat_img} src="http://localhost:3000/assets/samples/animals_1.jpg"></img>
            </div>
            <div className={style.cat_body}>
                <h3 className={style.title}>{builder['catalog_name']} 
                    {
                        builder['catalog_type'] == "animal" ?
                            <span className={style.title_ext}> {builder['catalog_gender']}</span>
                        :
                            <></>
                    }
                </h3>
                <div className={style.bio} dangerouslySetInnerHTML={{ __html: htmlDecode(builder['catalog_bio']) }}></div>
                <button className={"me-2 " + style.add_cart} title="Add to Cart"><FontAwesomeIcon icon={faCartPlus}/></button>
                <a className={style.detail_btn} href={"/detail/" + builder['catalog_slug']}>See Detail</a>
                <span className={style.price}>Rp. {numberToPrice(builder['catalog_price'])}</span>
            </div>
        </div>
    </div>
}