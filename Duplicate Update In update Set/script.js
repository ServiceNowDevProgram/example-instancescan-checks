(function(findings) {
    var updatexml = new GlideRecord('sys_update_xml');
    updatexml.addEncodedQuery("sys_created_onONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()");
    updatexml.orderByDesc('sys_created_on');
    updatexml.query();
    while (updatexml.next()) {
		var updateset = updatexml.update_set.getRefRecord();
        var sysUpdateXmlGr = new GlideRecord('sys_update_xml');
        sysUpdateXmlGr.addQuery('name', updatexml.getValue('name'));
        sysUpdateXmlGr.addQuery('update_set', updateset.getValue('sys_id'));
        sysUpdateXmlGr.addQuery('sys_id', '!=', updatexml.getValue('sys_id'));
        sysUpdateXmlGr.setLimit(1);
        sysUpdateXmlGr.query();
        if (sysUpdateXmlGr.hasNext()) {
            findings.increment();
        }
    }
})(findings, updatexml, current, updateset);
