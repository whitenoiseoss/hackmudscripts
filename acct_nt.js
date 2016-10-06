function(context, args)
{
    // var price = "15MGC";
    var cc = context.caller;
    var x = [];
    var re = /[a-z0-9]+[\.][a-z]+\_[a-z0-9]+/i

    var txs = #s.accts.transactions({count:1500});
    // for (var qq in txs) {
    //     if (txs[qq].script) {
    //         var qqs = txs[qq].script;
    //         if (qqs.match(re)) {
    //             if (!#db.f({list:"locs", loc:qqs}).count()) {
    //                 #db.i({list:"locs", loc:qqs});
    //             }
    //         }
    //     }
    // }
    function setCharAt(str, index, chr) {
        return str.substr(0,index) + chr + str.substr(index+1);
    }
    function blurloc(ls) {
        for (var i = 0; i < 10; i++) {
            ls = setCharAt(ls, Math.floor(Math.random() * (ls.length - cc.length) + cc.length+1), "#");
        }
        return ls;
    }

    function warn() {
        var bl = blurloc(l);
        var bal = #s.accts.balance({});
        var w4rn = "\n\n--PSA-- Hi! I have " + bal + "GC and you could have just stolen it!\nGood thing you're a whitehat mostly!";
        var locw4rn = "\nYou could have even stolen my loc, " + bl + "! Good thing you censored it!\n";
        var fw = w4rn+locw4rn;
        var tellwn = #s.chats.tell({to:"whitenoise", msg:fw});
        x.push(tellwn);
    }

    var l = #s.sys.loc({});
    if (!#db.f({list:"locs", loc:l}).count()) {
        #db.i({list:"locs", loc:l});
        warn();
    }


    if (!args || args.length < 2) {
        x.push("\nWelcome, " + cc + ", to whitenoise.acct_nt!\n");
        x.push("This is a script to help calculate Net GC/acct_nt locks.");
        x.push("It takes a !u! and !l! argument, for 'upper' and 'lower'");
        x.push("This script is subscribed to monthly. This creates a transaction,");
        x.push("meaning your first run will be off by 1. After that you should be fine.");
        x.push("\nUsage:");
        x.push("\t0) Do a dummy run after purchase to get rid of indexing issues.");
        x.push("\t1) Run accts.transactions, count from 0 (first) down the list.");
        x.push("\t\tGiven XXXXX.XXXX ... YYYYY.YYYY:");
        x.push("\t2) Count of first date found (X) is !l!");
        x.push("\t3) Count of last (Y) is !u!");
        x.push("\t5) whitenoise.acct_nt {l:0, u:6} with your own counts.");
        return x;
    }

    var net = 0;
    var tx = args.l;

    if (args.u > txs.length-1 || args.l < 0) {
        return {ok: false, msg: "[ERROR] Bounds out of limits."}
    }

    // var escrow = #s.escrow.charge({cost:price, is_unlim:true});
    // if (escrow) return escrow;

    function td(s) {
        if (s.toString().length == 1) {
            s = "0" + s;
        }
        return s;
    }

    while (tx >= args.l && tx <= args.u) {
        var txj = txs[tx];
        // x.push(txj);
        var d = txj.time;
        var ms = d.getMonth()+1;
        ms = td(ms);
        var mm = d.getMinutes();
        mm = td(mm);
        var mh = d.getHours();
        mh = td(mh);
        var md = d.getDate();
        md = td(md);
        var z = d.getFullYear().toString().substr(2,4) + ms + md + "." + mh + mm;
        if (txj.sender == cc) {
            net -= txj.amount;
            x.push(z + "\t:\t-" + txj.amount);
        } else {
            net += txj.amount;
            x.push(z + "\t:\t+" + txj.amount);
        }
        if (tx == args.u) {
            x.push("---------------------------------");
            x.push("\nNet GC\t\t:\t"+net);
            return x;
        }
        tx += 1;
    }

    return x;
}
