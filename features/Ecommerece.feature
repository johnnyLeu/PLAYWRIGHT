Feature: E-commerce validation

  Scenario: Placing the order
    Given A login to E-commerce application with "flameman19@gmail.com" and "Iamking@000"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid data payments with email "flameman19@gmail.com", country "Italy", credit card "1234 5678 9000 1908", card month "08", card year "19", ccv "000", and name on card "Giovanni Di Pietrantonio" and Place the Order
    Then Verify that the info in the confirmation order page are correct
    When Go to Order History Page 
    Then Verify that the order is in History 
  