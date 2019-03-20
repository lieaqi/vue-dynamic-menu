import { MessageBox } from 'element-ui'
MessageBox.alert;
export function getOrderNumber() {
    return new Date().getTime() + "" + Math.floor(Math.random() * (90 + 1) + 10)
}
export function getCommodityInfoList(list) {
    list.map(e => {
        if (e.CommodityInfoList.length) {
            e.CommodityInfoList.map((ev, ind) => {
                let data = {};
                for (let x in e) {
                    data[x] = e[x];
                }
                data.CommodityCode = ev.CommodityCode;
                data.Unit = ev.UnitInfo.Name;
                data.OldPrice = ev.OldPrice;
                data.SubtotalPrice = ev.SubtotalPrice;
                data.Amount = ev.Amount;
                if (ind == 0) data.len = e.CommodityInfoList.length;
                ev.SpecificationList.length &&
                    ev.SpecificationList.map(z => {
                        e.SpecificationTypeList.map(m => {
                            if (z.ParentId == m.Id) z.show = `${m.Name}:${z.Name}`;
                        });
                    });
                data.CommodityInfo = ev;
            });
        }
    });
}
{/* <div class="m-r-10" style="flex:0 0 100px;justify-content: space-between;display: flex;">
${
c.label.split('').map(l => {
return `<span>${l}</span>`
}).join('')
}
</div> */}
export function getConfirmHtml(config, text = '确认信息') {
    let newConfig = config && config.map(c => {
        return `<div class="c-flex" style="margin-bottom:5px">
                    <div style="flex:0 0 85px;text-align: right;margin-right: 10px;">${c.label || ''}:</div>
                    <div class="flex-1 red">${c.value || ''}</div>
                </div>`
    }) || []
    let html = `<div>${newConfig.join('')}</div>`
    return this.$alert(html, text, {
        dangerouslyUseHTMLString: true
    });
}
