CREATE TABLE IF NOT EXISTS person (
                                        id SERIAL PRIMARY KEY,
                                        vorname VARCHAR(50) NOT NULL,
    nachname VARCHAR(50) NOT NULL,
    alter INT,
    email VARCHAR(100),
    stadt VARCHAR(50),
    beruf VARCHAR(100),
    erstellt_am TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Beispieldaten einfügen
INSERT INTO person (vorname, nachname, alter, email, stadt, beruf) VALUES
                                                                         ('Anna', 'Schmidt', 28, 'anna.schmidt@example.com', 'Berlin', 'Softwareentwicklerin'),
                                                                         ('Max', 'Müller', 34, 'max.mueller@example.com', 'Hamburg', 'Projektmanager'),
                                                                         ('Lisa', 'Keller', 22, 'lisa.keller@example.com', 'München', 'Marketingassistentin'),
                                                                         ('Tobias', 'Weber', 41, 'tobias.weber@example.com', 'Köln', 'Lehrer'),
                                                                         ('Sophie', 'Neumann', 27, 'sophie.neumann@example.com', 'Frankfurt', 'Data Analyst'),
                                                                         ('Jonas', 'Fischer', 31, 'jonas.fischer@example.com', 'Stuttgart', 'Vertriebsleiter'),
                                                                         ('Laura', 'Hoffmann', 29, 'laura.hoffmann@example.com', 'Dresden', 'UX Designerin'),
                                                                         ('Felix', 'Schneider', 35, 'felix.schneider@example.com', 'Leipzig', 'Systemadministrator'),
                                                                         ('Nina', 'Bauer', 24, 'nina.bauer@example.com', 'Bremen', 'Fotografin'),
                                                                         ('Alexander', 'König', 38, 'alexander.koenig@example.com', 'Hannover', 'Rechtsanwalt'),
                                                                         ('Clara', 'Wagner', 26, 'clara.wagner@example.com', 'Berlin', 'Content Creator'),
                                                                         ('Daniel', 'Becker', 33, 'daniel.becker@example.com', 'München', 'Finanzberater'),
                                                                         ('Marie', 'Schäfer', 30, 'marie.schaefer@example.com', 'Köln', 'Ärztin'),
                                                                         ('Paul', 'Keller', 25, 'paul.keller@example.com', 'Frankfurt', 'Student'),
                                                                         ('Hannah', 'Krüger', 37, 'hannah.krueger@example.com', 'Dortmund', 'Architektin'),
                                                                         ('Lukas', 'Scholz', 40, 'lukas.scholz@example.com', 'Hamburg', 'Bauingenieur'),
                                                                         ('Julia', 'Zimmermann', 29, 'julia.zimmermann@example.com', 'Stuttgart', 'Produktmanagerin'),
                                                                         ('Sebastian', 'Hartmann', 32, 'sebastian.hartmann@example.com', 'Leipzig', 'Mechaniker'),
                                                                         ('Laura', 'Lehmann', 27, 'laura.lehmann@example.com', 'Berlin', 'HR Managerin'),
                                                                         ('Tim', 'Bergmann', 45, 'tim.bergmann@example.com', 'Kiel', 'Elektrotechniker'),
                                                                         ('Mia', 'Graf', 23, 'mia.graf@example.com', 'München', 'Studentin'),
                                                                         ('Philipp', 'Vogel', 36, 'philipp.vogel@example.com', 'Dresden', 'Softwarearchitekt'),
                                                                         ('Leonie', 'Sommer', 31, 'leonie.sommer@example.com', 'Berlin', 'Lehrerin'),
                                                                         ('David', 'Schuster', 39, 'david.schuster@example.com', 'Bremen', 'Produktdesigner'),
                                                                         ('Ella', 'Brandt', 28, 'ella.brandt@example.com', 'Hamburg', 'Eventmanagerin');