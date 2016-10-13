# iso3166-1 Makefile
#
# This makefile builds a single file, i.e., src/index.json. It is
# the data used by the package, and it gets its data from the repo
# identified below.
#
# Simply run make from this directory to ensure the data is up to
# date. If your git status is clean after running it, then you're
# already up-to-date.

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
