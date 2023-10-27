Restict the number of row counts ma x to 10,20,50 instaed of higher limit as 100 and 1000 to tune the performance on different table when user interact. This is increase the user experience and platform performance as well. Since it is exposed to potentially slower performance due to having query, process ACL and then render more records.

Navigate to user preference <sys_user_preference> table and search by 'rowcount'. Set the value to 50 max.
Also, can set the property 'glide.ui.per_page' sys property value to 10, 20, 50 only
