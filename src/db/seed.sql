

DO $$

DECLARE

BEGIN


/*//TODO: Create seed data for the department table */
INSERT INTO department (id, department_name) VALUES
(1, 'Finance'),
(2, 'Sales'),
(3, 'Legal'),
(4, 'Engineering');


/*//TODO: Create seed data for the role table */

INSERT INTO role (id, role_title, role_salary, department_id) VALUES
(150, 'Sales Lead', 100000, 2),
(151, 'Salesperson', 80000, 2),
(152, 'Lead Engineer', 150000, 4),
(153, 'Software Engineer', 120000, 4),
(154, 'Account Manager', 160000, 1),
(155, 'Accountant', 125000, 1),
(156, 'Legal Team Lead', 250000, 3),
(157, 'Lawyer', 190000, 3);

/*//TODO: Create seed data for the employee table */
INSERT INTO employee (id, employee_first_name, employee_last_name, role_id, manager_id) VALUES
(2000, 'John','Doe', 150, NULL),
(2001, 'Mike','Chan', 151, 2000),
(2002, 'Ashley','Rodriguez', 152, NULL),
(2003, 'Kevin','Tupik', 153, 2002),
(2004, 'Kunal','Singh', 154, NULL),
(2005, 'Malia','Brown', 155, 2004),
(2006, 'Sarah','Lourd', 156, NULL),
(2007, 'Tom','Allen', 157, 2006);


RAISE NOTICE 'Success';

EXCEPTION 
    WHEN OTHERS THEN 
        RAISE NOTICE 'Error %:', SQLERRM;
        ROLLBACK;


END $$;