# MyCo Backend

## Getting started

Deben tener instalado:
- NodeJS (Entorno de javascript en el servidor)
- MySQL (Base de datos)

Además recomiendo:
- Gitkraken (GUI para git)
- Insomnia (Cliente HTTP para pruebas)

Para poder ejecutar el proyecto es necesario que tengan configurado su archivo `.env`
con valores similares a estos (adecuados a los de su maquina local)

DEV_DB_HOST=localhost
DEV_DB_USER=root
DEV_DB_PASSWORD=1234567890
DEV_DATABASE_NAME=myco

## Estatus de desarrollo endpoints criticos

| Endpoint                  | Método | Finalizado |
| ------------------------- | ------ | ---------- |
| /register                 | POST   | ✔          |
| /login                    | POST   | ✔          |
| /residency/create         | POST   | ✔          |
| /residency/services       | POST   | 🗙          |
| /property/services        | POST   | 🗙          |
| /residency/properties     | POST   | 🗙          |
| /residency/property-types | POST   | 🗙          |
| /residency/residents      | GET    | ✔          |
| /residency/services       | GET    | 🗙          |
| /property/services        | GET    | 🗙          |
| /residency/debts          | GET    | 🗙          |
| /resident/debts           | GET    | 🗙          |
| /residency/bills          | GET    | 🗙          |
| /resident/bills           | GET    | 🗙          |
| /residency/properties     | GET    | 🗙          |
| /resident/properties      | GET    | 🗙          |
| /residency/property-types | GET    | 🗙          |


## Lista endpoints

**Endpoints MyCo** - _revisión 1_

**GET** <br/>
**Ruta:** _/residency/residents_ <br/>
**Descripción:** Lista todos los residentedes de una residencia

```
body {
	residency_id: "123"
}
```

**POST** <br/>
**Ruta:** _/residency/residents_ <br/>
**Descripción:** Agrega un nuevo residente a una residencia
```
body {
   residency_id,
   ...residentObject
}
```

**PUT** <br/>
**Ruta:** _/residency/residents_ <br/>
**Descripción:** Actualiza los datos de un residente de una residencia
```
body {
   residency_id,
   user_id,
   ...userObject
}
```

**DELETE** <br/>
**Ruta:** _/residency/residents_ <br/>
**Descripción:** Elimina a un residente de una residencia
```
body {
   residency_id,
   user_id
}
```

___________________

**GET** <br/>
**Ruta:** _/residency/services_ <br/>
**Descripción:** Lista todos los servicios de una residencia
```
body {
	residency_id: "123"
}
```

**POST** <br/>
**Ruta:** _/residency/services_ <br/>
**Descripción:** Agrega un nuevo servicio a una residencia
```
body {
   residency_id,
   ...serviceObject
}
```

**PUT** <br/>
**Ruta:** _/residency/services_ <br/>
**Descripción:** Actualiza un servicio de una residencia
```
body {
   residency_id,
   service_id,
   ...serviceObject
}
```

**DELETE** <br/>
**Ruta:** _/residency/services_ <br/>
**Descripción:** Elimina un servicio de una residencia
```
body {
   residency_id,
   service_id
}
```

___________

**GET** <br/>
**Ruta:** _/property/services_ <br/>
**Descripción:** Lista todos los servicios de una propiedad
```
body {
	property_id: "123"
}
```

**POST** <br/>
**Ruta:** _/property/services_ <br/>
**Descripción:** Asocia un servicio de la residencia a una propiedad
```
body {
	property_id,
  service_id
}
```

**DELETE** <br/>
**Ruta:** _/property/services_ <br/>
**Descripción:** Elimina un servicio asociado a una propiedad
```
body {
   property_id
   service_id
}
```

________

**GET** <br/>
**Ruta:** _/residency/debts_ <br/>
**Descripción:** Lista todas las deudas pendientes de una residencia
```
body {
	residency_id: "123"
}
```

_______

**GET** <br/>
**Ruta:** _/resident/debts_ <br/>
Lista todas las deudas de un residente
```
body {
	user_id: "123"
}
```

**PUT** <br/>
**Ruta:** _/resident/debts_ <br/>
**Descripción:** Actualiza una deuda de un residente
```
body {
   user_id,
   debt_id,
   ...debtObject
}
```

________

**GET** <br/>
**Ruta:** _/residency/bills_ <br/>
**Descripción:** Lista todas las facturas de una residencia
```
body {
	residency_id: "123"
}
```

________

**GET** <br/>
**Ruta:** _/resident/bills_ <br/>
**Descripción:** Lista todas las facturas de un residente
```
body {
	user_id: "123"
}
```

________

**GET** <br/>
**Ruta:** _/residency/properties_ <br/>
**Descripción:** Lista todas las propiedades de una residencia
```
body {
	residency_id: "123"
}
```


**POST** <br/>
**Ruta:** _/residency/properties_ <br/>
**Descripción:** Agrega una propiedad a una residencia
```
body {
   residency_id,
   ...propertyObject
}
```

**PUT** <br/>
**Ruta:** _/residency/properties_ <br/>
**Descripción:** Actualiza una propiedad de una residencia
(Ej: asociar un usuario a una propiedad, o actualizar el metraje de una propiedad porque recibió una remodelación)
```
body {
   residency_id,
   property_id,
   ...propertyObject
}
```

________

**GET** <br/>
**Ruta:** _/resident/properties_ <br/>
**Descripción:** Lista todas las propiedades de un residente
```
body {
	user_id: "123"
}
```

_______

**GET** <br/>
**Ruta:** _/residency/property-types_ <br/>
**Descripción:** Lista todos los tipos de propiedades de una residencia
(Ejemplo: penthouse, apartamento, etc)
```
body {
	residency_id: "123"
}
```

**POST** <br/>
**Ruta:** _/residency/property-types_ <br/>
**Descripción:** Permite crear un nuevo tipo de propiedad a una residencia
```
body {
   residency_id
   ...propertyTypeObject
}
```

**DELETE** <br/>
**Ruta:** _/residency/property-types_ <br/>
**Descripción:** Elimina un tipo de propiedad de una residencia
```
body {
   residency_id
   property_type_id
}
```
