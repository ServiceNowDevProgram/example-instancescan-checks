(function(findings, updatexml, updateset) {

    var sysUpdateXmlGr = new GlideRecord('sys_update_xml');
    sysUpdateXmlGr.addQuery('name', updatexml.getValue('name'));
    sysUpdateXmlGr.addQuery('update_set', updateset.getValue('sys_id'));
    sysUpdateXmlGr.addQuery('sys_id', '!=', updatexml.getValue('sys_id'));
    sysUpdateXmlGr.setLimit(1);
    sysUpdateXmlGr.query();
    if(sysUpdateXmlGr.hasNext()){
       findings.increment();
    }

})(findings, updatexml, current, updateset);
