# example-instancescan-checks

ServiceNow open-sourced this repository of example [ServiceNow Instance Scan](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/health-scan/reference/hs-landing-page.html) Checks with the intent to help customers get started faster in adopting Instance Scan, but will not be providing formal support. The checkes contained in this repository are therefor considered "use at your own risk", and will rely on the open-source community to help drive fixes and feature enhancements via Issues. ServiceNow is not claiming them to work perfect neither are all of them implemented to allow validations of best practice. Occasionally, ServiceNow may choose to contribute to the open-source project to help address the highest priority Issues, and will do our best to keep the checks updated with the latest changes shipped with family releases.


# Checks in this repository

## Category: Manageability

### Duplicate Script Include Name
This uses a table check to find other Script Includes having the same API name. Technically this is possible, but causes issues as there is no way to control which Script Include will be instantiated when being called.

## Category: Upgradability

## Category: Performance

### getMessage() called in Client Script 
This is a simple table check to find client scripts with use the getMessage function but do not preload messages using the Messages field. As the check does a simple contains query it could produce false-positives if the getMessage is either commented or from another library.

### Glide-API in ACL
This will check ACL rules with operation READ for usage of Glide API calls, i.e. GlideRecord and GlideAggregate as these can cause significant performance impact. s the check does a simple contains query it could produce false-positives if the getMessage is either commented or from another library.

### Cache flushed as part of scripts
This is using some advanced linter check to find usages of gs.setProperty or gs.cacheFlush. Both functions will trigger a cache flush and thus cause performance impacts. 

## Category: Security

### Tables without ACLs
This check searches for any custom table if there exists at least one ACL record. If not a finding is raised.

## Category: User Experience



# Additional resources

Please check these additional links for more information and details:

- [Mark Roethof’s Blogs](https://community.servicenow.com/community?id=community_blog&sys_id=14e51965db2200d013b5fb24399619fb#is)
- [Live Coding Happy Hour – Instance Scan in Quebec (2021-03-12)](https://youtu.be/_cPlWnh1Z68)
- [Introduction to ServiceNow HealthScan and Instance Scan](https://nowlearning.service-now.com/lxp?id=overview&sys_id=e4c538231b0d6c505b2699f4bd4bcb6f&type=course)
- [K21 CCL1062 – Writing custom instance scan checks](https://nowlearning.service-now.com/lxp?id=overview&sys_id=8d9db4921b7fe010a5e699b1b24bcbdd&type=course)
- [Quebec Instance Scan](https://developer.servicenow.com/blog.do?p=/post/quebec-instancescan/)





