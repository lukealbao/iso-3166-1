COUNTRY_DATA_REPO	= git@github.com:datasets/country-codes.git
COUNTRY_DATA_SRC	= ./country-codes
COUNTRY_DATA		= $(COUNTRY_DATA_SRC)/data/country-codes.csv
SRC			= ./src

$(SRC)/index.json: $(SRC)/countries.json
	npm run index -- $< $@
	rm -f $<
	rm -rf $(COUNTRY_DATA_SRC)

$(SRC)/countries.json: $(COUNTRY_DATA) $(SRC)
	npm run generate -- $< $@

$(COUNTRY_DATA): $(COUNTRY_DATA_SRC)
	cd $(COUNTRY_DATA_SRC)/data \
	git pull

$(COUNTRY_DATA_SRC):
	git clone $(COUNTRY_DATA_REPO)

$(SRC):
	mkdir -p $(SRC)
