

const RemoveCodec = (orgsdp, codec) => {

    var internalFunc = function(sdp) {
        var codecre = new RegExp('(a=rtpmap:(\\d*) ' + codec + '\/90000\\r\\n)');
        var rtpmaps = sdp.match(codecre);
        if (rtpmaps == null || rtpmaps.length <= 2) {
            return sdp;
        }
        var rtpmap = rtpmaps[2];
        // var modsdp = sdp.replace(codecre, "");​
        var modsdp = sdp.replace(codecre, "");
        var rtcpre = new RegExp('(a=rtcp-fb:' + rtpmap + '.*\r\n)', 'g');
        //  modsdp = modsdp.replace(rtcpre, "");​
        modsdp = modsdp.replace(rtcpre, "");
        var fmtpre = new RegExp('(a=fmtp:' + rtpmap + '.*\r\n)', 'g');
        //    modsdp = modsdp.replace(fmtpre, "");​
        modsdp = modsdp.replace(fmtpre, "");
        var aptpre = new RegExp('(a=fmtp:(\\d*) apt=' + rtpmap + '\\r\\n)');
        var aptmaps = modsdp.match(aptpre);
        var fmtpmap = "";
        if (aptmaps != null && aptmaps.length >= 3) {
            fmtpmap = aptmaps[2];
            // modsdp = modsdp.replace(aptpre, "");​
            modsdp = modsdp.replace(aptpre, "");
            var rtppre = new RegExp('(a=rtpmap:' + fmtpmap + '.*\r\n)', 'g');
            modsdp = modsdp.replace(rtppre, "");
        }
        var videore = /(m=video.*\r\n)/;
        var videolines = modsdp.match(videore);
        if (videolines != null) {
            //If many m=video are found in SDP, this program doesn't work.
            var videoline = videolines[0].substring(0, videolines[0].length - 2);
            var videoelem = videoline.split(" ");
            var modvideoline = videoelem[0];
            for (var i = 1; i < videoelem.length; i++) {
                if (videoelem[i] === rtpmap || videoelem[i] === fmtpmap) {
                    continue;
                }
                modvideoline += " " + videoelem[i];
            }
            modvideoline += "\r\n";
            modsdp = modsdp.replace(videore, modvideoline);
        }
        return internalFunc(modsdp);
    };
    return internalFunc(orgsdp);
};