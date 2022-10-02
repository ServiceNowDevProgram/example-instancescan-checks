# example-instancescan-checks

```Open-Sourced community contributed and owned repository for Instance Scan Definitions. ```

[ServiceNow Instance Scan](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/health-scan/reference/hs-landing-page.html) The checks contained in this repository are therefore considered "use at your own risk" and will rely on the open-source community to help drive fixes and feature enhancements via Issues and community members issuing and reviewing PRs. ServiceNow is not providing or authenticating these definitions. Occasionally, ServiceNow employees may choose to contribute to the open-source project as members of the community as they see fit, this does not constitute a service or product from ServiceNow.

🔔🔔🔔<br>
***CONTRIBUTORS must follow all guidelines in [CONTRIBUTING.md](CONTRIBUTING.md)*** or run the risk of having your Pull Requests labeled as spam.<br>
🔔🔔🔔

# Checks in this repository

## Category: Manageability

### Consider using getXMLAnswer instead of getXML
  	getXMLAnswer only retrieves the Answer which we are actually after. getXML retrieves the whole XML document. In most cases, we are not interested in the whole XML document, though only in the Answer.
	For the rare cases where you are interested in the whole XML document, simply mute the generated scan finding.

### Could not verify Remote instance connection
	Connection test for the remote instance defined did not result in a positive response. 

### Duplicate Script Include Name
	This uses a table check to find other Script Includes having the same API name. Technically this is possible, but causes issues as there is no way to control which Script Include will be instantiated when being called.

### Don't use new Array()
	In general, you should use the array literal notation when possible. It is easier to read, it gives the compiler a chance to optimize your code, and it's mostly faster too.

### Don't use new Object()
	In general, you should use the object literal notation when possible. It is easier to read, it gives the compiler a chance to optimize your code, and it's mostly faster too.

### High number of workflows running for a single record
	In general, for a single record only a few Workflow context will be running. If a high number of Workflow context are active, this often indicates an issue on the starting conditions of your Workflow. More then 10 active Workflow context is considered being a high number. 

### Parent All Nodes/Active Nodes without childs
	Schedule records with system ID "all Nodes" or "active nodes", are considered to be parent schedules. Parent schedules that themselves will never run but instead spawn child jobs (of the same name) for each application node required by their definition. Jobs with system ID "all nodes", are typically background maintenance jobs required for general node health and management. Jobs with system ID "active nodes", are typically jobs that need to run the same event processor or other jobs that need increased processing bandwidth across the platform.

### Product Catalog without Product Models
	Catalog Items in the Product Catalog should be created from the underlying Product Model and this association should be kept intact.

### Scripts should not contain debugging statements in production
	The "gs.log()", "gs.debug()", "console.log()", etc. statements can be used to write information to the system log, while the "gs.print()", etc. statements also sends it as output to the screen. It is generally used when debugging. Using "gs.log()", "gs.debug()", "console.log()", etc. statements on a production instance will pollute the system log, while it is never used as you do not perform debugging on a production instance.

### Unprocessed queues
	External Communication Channel (ECC) Queue is a connection point between an instance and the MID Server. Jobs that the MID Server needs to perform are saved in this queue until the MID Server is ready to handle them. The default polling interval is set to 40 seconds. When there are unprocessed queue records, this can indicate a large volume of queue records, a processing issue in general, or a MID Server issue.

### Unprocessed schedules
	Schedules with a state "Ready" run at the next scheduled interval (this does not include schedules with trigger type "Run at System Startup" and "On Demand"). When there are unprocessed schedules, this can indicate a large volume of schedules, a processing issue in general, or errors on the individual schedule itself.

### Do not use hard-coded sys_ids
	Hard-coded sys_ids can lead to unpredictable results (sys_ids may differ between instances) and can be difficult to track down.

### Hard coded Instance URL
	Hard coding instance URL is not a best practice as they reduce the usability of your code. The URL remains static and it does not change when you move the code to a different instance or it can get overwritten during clone backs. This can break the related functionalities or create unexpected results.

### Before Business rules should not insert() records in any tables
	Before business rules execute before the data on current record is saved to database. In case, the before business rule fails or aborts its operation, then any insert operations within the business rule becomes invalid but it cannot be reverted back as the operation would have already been completed. In order to avoid such issues, before business rules should not include insert operations.

### Update set description should not be empty
	Validates the description of the update sets created is not empty as it provides the release management team better understanding what's getting pushed.

### Update set should not have more than 1000 updates 
	Update sets with more than 1000 configuration updates should be broken down into multiple update sets with batching or the parent story has to be more granular as reviewing update set configs and commiting/backing out may have issues.  

### Updates in wrong update set scope
	The scope for Customer Update [sys_update_xml] records should match the scope of the Update Set in which the Customer Update resides. Having a mismatch may cause Update Sets to generate preview errors meaning you cannot commit them until the errors are resolved.

## Category: Upgradability

### Incident table should not be extended
	Check if the baseline restriction to extend the Incident table has been removed and at least one child table extending Incident has been created.

### Choice table should not be extended
	Check if the Choice [sys_choice] table has been extended. This is not supported by ServiceNow.

### User table should not be extended
	Check if the User [sys_user] table has been extended. This is not recommended and can cause problems when a user needs to be in more than one user table.

## Category: Performance

### getMessage() called in Client Script 
	This is a simple table check to find client scripts with use the getMessage function but do not preload messages using the Messages field. As the check does a simple contains query it could produce false-positives if the getMessage is either commented or from another library.

### Glide-API in ACL
	This will check ACL rules with operation READ for usage of Glide API calls, i.e. GlideRecord and GlideAggregate as these can cause significant performance impact. s the check does a simple contains query it could produce false-positives if the getMessage is either commented or from another library.

### Cache flushed as part of scripts
	This is using some advanced linter check to find usages of gs.setProperty or gs.cacheFlush. Both functions will trigger a cache flush and thus cause performance impacts. 

### Global Business Rules
	This is a simple table check to find Business Rules that are global. Global Business Rules have no condition or table restrictions and load on every page in the system. Most functions defined in global Business Rules are fairly specific, such as an advanced reference qualifier on one field of one form. There is no benefit to loading this kind of script on every page.

### Global Client Scripts 
	This is a simple table check to find Client Scripts that are global. Global client scripts have no table restrictions; therefore they will load on every page in the system introducing browser load delay in the process.

### Using Synchronous AJAX calls in client script
	Synchronous usage of AJAX calls (getXMLWait) pauses the browser interaction until data is retrieved from the server side and thereby reducing user experience. Using them in an onLoad or onChange client side scripts is not a best practice recommendation and can create performance issues for your users.

### Business Rule without any conditions
	A business rule is triggered whenever a user opens a list or form view or when a user inserts/updates or deletes a record. Without any conditions added, it will always evaluate to true and triggerred at all times. This can add to the performance increasing server processing time and hence it is recommended to restrict business rule execution by either adding a condition or filter condition or a role condition and preventing its execution unless it is necessary.

### Business rules should not use current.update() 
 	 Avoid using current.update() in a business rule script. The update() method triggers business rules to run on the same table for insert and update operations, leading to a business rule calling itself over and over. Changes made in before business rules are automatically saved when all before business rules are complete, and after business rules are best used for updating related, not current, objects

### Avoid Dot-Walking to the sys_id of a Reference Field
	  The value of a reference field is a sys_id. When you dot-walk to the sys_id, the system does an additional database query to retrieve the caller_id record, then retrieves the sys_id. This can lead to performance issues. 

### Do not use getRowCount() for fetching row count
	  Using getRowCount method of GlideRecord can cause performance issues while quering on tables with high record count. The method counts each row one by one to determine the total row count and hence more the number of rows, more time it would take to execute scripts that uses it.

### Query business rules should not use query() on GlideRecord
	  Query business rules that query themselves will continue to loop indefinitely until being caught by the platforms recursion limit. This can build up to an excessive response time and possibly cause the transaction to time out or create performance issues.

### Always deregister $rootScope.$on listeners on the scope $destory event
  $rootScope.$on listeners will remain in memory if not properly cleaned up. This will create a memory leak if the controller falls out of scope.
  ```javascript
  api.controller = function ($rootScope, $scope) {
    /* widget controller */
    var c = this;

    var deregister = $rootScope.$on("someevent", function () {});

    $scope.$on("$destroy", function destroyScope() {
      deregister();
    });
  };
  ```

### Provide alternate value when fetching Glide property
 	 Recommendation to provide alternate/default value when calling gs.getProperty() to avoid errors if the property is not set. 


## Category: Security

### Tables without ACLs
	This check searches for any custom table if there exists at least one ACL record. If not a finding is raised.

### Scripted REST API without Authentication
	Scripted REST APIs should be not be public but enforce  access controls and require additional access to data. 

### Avoid the eval function
	Improper use of eval() opens up your code for injection attacks and difficulties with debugging.

### Do not use gr as a variable name
	The platform is Javascript and a lot of code is run in a global variable scope. A "gr" defined in one business rule can clobber another "gr" defined in some other script.

### Admins not logged in for 1 month
	Monitor users with role `admin` (not locked out) that are not logged for longer than 1 month

### Users left in already inactivated Groups
	After deactivation of Groups there can be still some users.
Group offer membership but also can provide some roles that after deactivation should be considered as no longer needed.

### Report with public role can expose data to unauthenticated clients
	For table that store reports definition there is also posibility to assign roles. It is possible that by default it is added `public` role. It means that even not authorized clients can access such report and sometimes with exposed data that shouldn't be accessible.

### Scheduled Job with RunAs set as Locked Out user
	Detecting no longer active user with flag Locked Out set to true that is set as a RunAs for Scheduled Job

### Client Scripts should not use GlideRecord() API
	Verify that instance doesn't have GlideRecord() usage in client scripts and instead make use of GlideAjax.

## Category: User Experience



# Additional resources

Please check these additional links for more information and details:

	- [Platform Academy Foundation #5: Instance Scan Overview](https://community.servicenow.com/community?id=community_event&sys_id=f44eb0c0db82f410019ac22305961950)
	- [Mark Roethof’s Blogs](https://community.servicenow.com/community?id=community_blog&sys_id=14e51965db2200d013b5fb24399619fb#is)
	- [Live Coding Happy Hour – Instance Scan in Quebec (2021-03-12)](https://youtu.be/_cPlWnh1Z68)
	- [Introduction to ServiceNow HealthScan and Instance Scan](https://nowlearning.service-now.com/lxp?id=overview&sys_id=e4c538231b0d6c505b2699f4bd4bcb6f&type=course)
	- [K21 CCL1062 – Writing custom instance scan checks](https://nowlearning.service-now.com/lxp?id=overview&sys_id=8d9db4921b7fe010a5e699b1b24bcbdd&type=course)
	- [Quebec Instance Scan](https://developer.servicenow.com/blog.do?p=/post/quebec-instancescan/)





