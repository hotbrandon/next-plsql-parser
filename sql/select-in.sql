SELECT o.order_no, o.order_date, c.customer_name
FROM orders o
join customers c
WHERE order_status in ('1','2')
AND order_date=SYSDATE
AND o.customer_id=c.customer_id;
