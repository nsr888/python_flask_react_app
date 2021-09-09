import psycopg2
import os
from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS

DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_PORT = os.getenv('DB_PORT', '5432')
DB_NAME = os.getenv('DB_NAME', 'employees')
DB_USER = os.getenv('DB_USER', 'postgres')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'postgres')
conn_line = "host=" + DB_HOST + " port=" + DB_PORT + " dbname=" + DB_NAME + " user=" + DB_USER + " password=" + DB_PASSWORD
conn = psycopg2.connect(conn_line)


cur = conn.cursor()
app = Flask(__name__)
api = Api(app)
CORS(app)


class Employee(Resource):
    def get(self, employee_id):
        if not employee_id.isdigit():
            return "Error: Name '{}' not found".format(employee_id), 404
        cur.execute(
            """
                SELECT
                    t1.id,
                    t1.name,
                    t1.position,
                    t1.hired_at,
                    t1.salary,
                    t1.chief,
                    COUNT(t2.id)
                FROM 
                    "employees" t1
                LEFT JOIN "employees" t2 ON t2.chief = t1.id
                WHERE t1.chief = %s
                GROUP BY
                    t1.id,
                    t1.name,
                    t1.position,
                    t1.hired_at,
                    t1.salary,
                    t1.chief
                ;
        """,
            [int(employee_id)],
        )
        employeers = cur.fetchall()

        # print(employeers)
        x = []
        for a in employeers:
            x.append( {
                "id": a[0],
                "name": a[1],
                "position": a[2],
                "hired_at": a[3].isoformat(),
                "salary": a[4],
                "chief": a[5],
                "childs": a[6],
            })
        if employeers:
            return x, 200
        else:
            return "Error: Name '{}' not found".format(employee_id), 404


api.add_resource(Employee, "/<employee_id>")

if __name__ == "__main__":
    app.config["RESTFUL_JSON"] = {"ensure_ascii": False}
    app.run(host = "0.0.0.0", port=3001, debug=True)
    conn.close()
