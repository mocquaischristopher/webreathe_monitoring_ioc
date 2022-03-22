function getUptime(startDate: Date) {
    const uptime = Date.now()-startDate.getTime();
    return uptime;
}

export default getUptime;