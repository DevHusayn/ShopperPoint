// Utility: Sort malls by proximity to user location (Haversine formula)
export function getSortedMallsByProximity(malls, userLoc) {
    function toRad(x) { return x * Math.PI / 180; }
    function distance(a, b) {
        const R = 6371; // km
        const dLat = toRad(b.lat - a.lat);
        const dLon = toRad(b.lng - a.lng);
        const lat1 = toRad(a.lat);
        const lat2 = toRad(b.lat);
        const aVal = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(aVal), Math.sqrt(1 - aVal));
        return R * c;
    }
    return malls.slice().sort((m1, m2) => distance(userLoc, m1) - distance(userLoc, m2));
}
