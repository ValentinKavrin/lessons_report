/**
 * @swagger
 *  paths:
 *   /api/student:
 *      post:
 *          tags: [students]
 *          summary: Create new student
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  description: The student name.
 *                                  example: Valentin
 *                              class:
 *                                  type: integer
 *                                  description: Student's class number.
 *                                  example: 8
 *          responses:
 *              201:
 *                  description: Student object
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                      description: The student id.
 *                                      example: 1
 *                                  name:
 *                                      type: string
 *                                      description: The student name.
 *                                      example: Valentin
 *                                  class:
 *                                      type: integer
 *                                      description: Student's class number.
 *                                      example: 8
 *                                  username:
 *                                      type: string
 *                                      description: The student username to log in to the service.
 *                                      example: Valentin16151651616
 *                                  password:
 *                                      type: string
 *                                      description: The student password to log in to the service.
 *                                      example: dfmosfafd529
 *              400:
 *                  description: Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Something went wrong, try again.
 *                                  error:
 *                                      type: string
 *                                      example: Content can not be empty!
 *              500:
 *                  description: Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Something went wrong, try again.
 *                                  error:
 *                                      type: string
 *                                      example: Error.
 *      get:
 *          tags: [students]
 *          summary: Get list students.
 *          responses:
 *              201:
 *                  description: Students array
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array[object]
 *                              description: The array students.
 *                              example: [{id: 1, name: Valentin, class: 7}, {id: 2, name: Pasha, class: 7}]
 *              500:
 *                  description: Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Something went wrong, try again.
 *                                  error:
 *                                      type: string
 *                                      example: Error.
 * /api/students/:id:
 *      put:
 *          tags: [students]
 *          summary: Route for changing student.
 *          parameters:
 *          - in: query
 *            name: id
 *            required: true
 *            description: Student id.
 *            schema:
 *                type: integer
 *                example: 1
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  description: The student name.
 *                                  example: Valentin
 *                              password:
 *                                  type: string
 *                                  description: Student's password.
 *                                  example: password
 *          responses:
 *              201:
 *                  description: New student
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                      message:
 *                                          type: string
 *                                          example: Данные успешно обновлены.
 *              400:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Something went wrong, try again.
 *                                  error:
 *                                      type: string
 *                                      example: Content can not be empty.
 *              500:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Something went wrong, try again.
 *                                  error:
 *                                      type: string
 *                                      example: Error.
 *      delete:
 *          tags: [students]
 *          summary: Route for changing student.
 *          parameters:
 *          - in: query
 *            name: id
 *            required: true
 *            description: Student id.
 *            schema:
 *                type: integer
 *                example: 1
 *          responses:
 *              200:
 *                  description: Delete successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Удаление прошло успешно.
 *              400:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Something went wrong, try again.
 *                                  error:
 *                                      type: string
 *                                      example: Пользователь уже удален или не найден.
 *              500:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Something went wrong, try again.
 *                                  error:
 *                                      type: string
 *                                      example: Error.
 * /api/students/:
 *      patch:
 *          tags: [students]
 *          summary: Route for changing class for all students.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              isUpdate:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Delete successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Обновление классов прошло успешно.
 *              500:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Something went wrong, try again.
 *                                  error:
 *                                      type: string
 *                                      example: Error.
 */