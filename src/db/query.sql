SELECT 
    e.id AS employee_id,
    e.employee_first_name AS employee_first_name,
    e.employee_last_name AS employee_last_name,
    m.employee_first_name AS manager_first_name,
    m.employee_last_name AS manager_last_name
FROM 
    employee e
LEFT JOIN 
    employee m ON e.manager_id = m.id;
