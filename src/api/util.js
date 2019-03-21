//获取cookie、
export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

//删除cookie
export function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

export const radioCookies = {
  player_exist : 1,
  yq_playschange : 0,
  yq_playdata : 'r_99',
  yplayer_open : 1,
  yqq_stat : 0,
  _qpsvr_localtk : 0.6048809550898306,
  pgv_pvi : 6836838400,
  pgv_si : 's9804252160',
  pgv_info : 'ssid=s6550331094',
  ts_last : 'y.qq.com/portal/player_radio.html',
  pgv_pvid : 5256610020,
  ts_uid : 6503424530,
  uin : 'o2396586732',
  skey: '@p8UC28tPn',
  ptisp : 'cm',
  RK: '6TSZCMos/a',
  ptcz : '161ea7f35ff40643fc1e2733951a58fe9bc0209ec11fc20f4505ccf388d1f601',
  luin : 'o2396586732',
  lskey : '00010000c6de0d980f7fba373be900e59bdc16cfa27993e0eb64c4959bf77aaba9679d7392bea33d1bd05dd5',
  p_uin : 'o2396586732',
  pt4_token: '-P3qK6Iohuk5KbsqR8n1fcHkfHe5cFEkKz4s581qlOw_',
  p_skey: 'N9hVBEaRVjZWNDMrTF1S-ATy66x3BVxKa1RifOYrTR0_',
  p_luin : 'o2396586732',
  p_lskey : '00040000ea31cac81abc950d3c42e418c345cf838c8bca8cdcc2afc92d8e4761ed809f33cb1bc038a09a0611',
  yplayer_open : 1,
  qqmusic_fromtag : 66,
  ts_refer : 'xui.ptlogin2.qq.com/cgi-bin/xlogin'
}