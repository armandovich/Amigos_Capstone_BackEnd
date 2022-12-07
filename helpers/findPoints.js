function arePointsNear(checkPoint, centerPointArray, km) {
        let points = []
        var ky = 40000 / 360;
        for (var i = 0; i < centerPointArray.length; i++) {
            var kx = Math.cos(Math.PI * centerPointArray[i].latitude / 180.0) * ky;
            var dx = Math.abs(centerPointArray[i].longitude - checkPoint.lng) * kx;
            var dy = Math.abs(centerPointArray[i].latitude - checkPoint.lat) * ky;
            if (Math.sqrt(dx * dx + dy * dy) <= km)
                //return true;
                points.push(centerPointArray[i])
        }
        return points;
    }


export default arePointsNear