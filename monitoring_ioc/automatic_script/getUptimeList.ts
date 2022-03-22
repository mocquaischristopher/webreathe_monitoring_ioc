import getUptime from "./getUptime";

function getUptimeList(startDateList: []) {
    const uptimeList = [];
    for (const k of startDateList) {
        uptimeList.push({
            id:k.id,
            active:k.active != null?msToTime(getUptime(k.active)):'not active'
        })
    }
    return uptimeList;
}

export default getUptimeList;