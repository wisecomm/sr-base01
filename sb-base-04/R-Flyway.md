
# 적용
    // flyway
    implementation 'org.flywaydb:flyway-core'
    implementation 'org.flywaydb:flyway-mysql'

>> yml 적용
  flyway: 
    enabled: true
    baseline-on-migrate: true
    baseline-version: 1
    locations:
      - classpath:db/migration/mysql
      - classpath:db/seed/local

>> resources/db/migration/mysql/V20250402125601__Initial_Schema.sql : 테이블 생성 구문 추가
>> resources/db/seed/local/V20250402125602__Initial_Seed.sql : 테이블 인서트 구문 추가


