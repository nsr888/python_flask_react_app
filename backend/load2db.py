import psycopg2
import os
from faker import Faker
from random import randint

def rand_salary():
    return randint(40,220) * 1000


if __name__ == "__main__":
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_PORT = os.getenv('DB_PORT', '5432')
    DB_NAME = os.getenv('DB_NAME', 'employees')
    DB_USER = os.getenv('DB_USER', 'postgres')
    DB_PASSWORD = os.getenv('DB_PASSWORD', 'postgres')
    conn_line = "host=" + DB_HOST + " port=" + DB_PORT + " dbname=" + DB_NAME + " user=" + DB_USER + " password=" + DB_PASSWORD
    con = psycopg2.connect(conn_line)
    cursor = con.cursor()
    cursor.execute('''
        drop table if exists employees;
        create table if not exists employees(
            id integer PRIMARY KEY,
            name varchar(128),
            chief integer,
            hired_at date,
            salary integer,
            position varchar(128)
        );
            ''')
    fake = Faker('ru_RU')
    arr = []
    a = 0
    arr.append((1, fake.name(),  a, fake.date_between(start_date='-2y',
            end_date='today'), 20000000, "Директор"))
    a = 1
    for i in range(2, 13):
        arr.append((i, fake.name(),  a, fake.date_between(start_date='-2y',
            end_date='today'), rand_salary(), fake.job()))
    from_n = 13
    to_n = 100
    for a in range(2, 12):
        for i in range(from_n, to_n):
            arr.append((i, fake.name(),  a, fake.date_between(start_date='-2y',
                end_date='today'), rand_salary(), fake.job()))
        from_n = (a - 1) * 100
        to_n = (a) * 100
    arr.append((1000, fake.name(),  11, fake.date_between(start_date='-2y',
            end_date='today'), rand_salary(), fake.job()))
    # print(arr)
    cursor.executemany("INSERT INTO employees (id, name, chief, hired_at, salary, position) VALUES (%s, %s, %s, %s, %s, %s)", arr)
    con.commit()
    con.close()
