// Modules CSS
import style from './containers.module.css'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus} from "@fortawesome/free-solid-svg-icons"

export default function GetCatalogContainer({builder}) {
    return <div className='col-lg-4 col-md-3 col-sm-12'>
        <div className={style.cat_cont}>
            <div className={style.cat_body}>
                <h3 className={style.title}>Axolt <span className={style.title_ext}>Male</span></h3>
                <p className={style.bio}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                <button className={"me-2 " + style.add_cart}><FontAwesomeIcon icon={faCartPlus}/></button>
                <button className={style.detail_btn}>See Detail</button>
            </div>
        </div>
    </div>
}